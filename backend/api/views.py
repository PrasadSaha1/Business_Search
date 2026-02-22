from django.core.mail import send_mail
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.conf import settings
from django.contrib.auth import authenticate
import re
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.models import AnonymousUser as AnnoymousUser

# In every view, api_view["GET"] means that the data will be viewed, while POST means that data will be created 
# permissions_classes[IsAuthenticated] means that the user must be logged in to access the view, while AllowAny means that anyone can access the view

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_username(request):
    print("hi")
    email = request.data.get('email')
    users = User.objects.filter(email=email)

    if not users.exists():  # if the username is not found
        return Response({"error": "No users found with that email"}, status=404)

    usernames = [user.username for user in users]
    message = f"The username(s) associated with your email are:\n\n" + "\n".join(usernames)
    subject = "Your Username(s)"
    recipient = email

    # sends an email to the user
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [recipient],
        fail_silently=False,
    )

    return Response({"success": "Email sent to user"})

@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_password(request):
    username = request.data.get('username')

    try:
        user = User.objects.get(username=username)
        email = user.email
        if not email:  # If there is no email with that username
            return Response({"error": "No email associated with that username"}, status=400)
    except User.DoesNotExist:  # If the username is invalid
        return Response({"error": "User not found"}, status=404)

    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    reset_url = f"{settings.FRONTEND_URL}/reset_password/{uid}/{token}"

    subject = "Password Reset Request"
    message = f"Hi {user.username},\n\nClick the link below to reset your password:\n{reset_url}\n\nIf you didn’t request this, you can ignore this email."
    
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [email],
        fail_silently=False,  # throw an error if the email fails to send
    )

    return Response({"success": "Reset link sent to email"})

@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password_confirm(request):
    # This view is for when a user is changing their password on the reset password screen after they've recieved an email

    uidb64 = request.data.get("uid")
    token = request.data.get("token")
    new_password = request.data.get("new_password")

    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (User.DoesNotExist, ValueError, TypeError):
        return Response({"error": "Invalid link"}, status=400)

    if default_token_generator.check_token(user, token):
        user.set_password(new_password)
        user.save()
        return Response({"success": "Password has been reset successfully"})
    else:
        return Response({"error": "Invalid or expired token"}, status=400)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_account(request):
    user = request.user
    user.delete()
    return Response({'detail': 'Account deleted successfully'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_username(request):
    new_username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=request.user.username, password=password)
    if user is None:  # If the password doesn't match any usernames
        return Response({'detail': 'Invalid password'}, status=401)  # 401 - Unauthorized
    elif User.objects.filter(username=new_username).exists():
        return Response({'detail': 'Username already taken'}, status=409)  # 409 - Conflict
    else:
        request.user.username = new_username
        request.user.save()
        return Response({'detail': 'Username changed successfully'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')
    confirm_password = request.data.get('confirm_password')

    user = authenticate(username=request.user.username, password=old_password)
    if user is None:  # If password doesn't match the username
        return Response({'detail': 'Invalid password'}, status=401)
    elif len(new_password) < 8:
        return Response({'detail': 'New password must be at least 8 characters long'}, status=400)
    elif new_password != confirm_password:    
        return Response({'detail': 'New passwords do not match'}, status=409)
    else:
        request.user.set_password(new_password)
        request.user.save()
        return Response({'detail': 'Password changed successfully'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_email(request):
    email = request.data.get('email')

    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    if not re.match(pattern, email):
        return Response({"error": "Invalid email format"}, status=401)
    else:
        request.user.email = email
        request.user.save()
        return Response({'detail': 'Email changed successfully'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_email(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(username=request.user.username, password=password)

    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    if not re.match(pattern, email):
        return Response({"error": "Invalid email format"}, status=401)
    elif user is None:
        return Response({'detail': 'Invalid password'}, status=400)
    else:
        request.user.email = email
        request.user.save()
        return Response({'detail': 'Email changed successfully'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def contact_us(request):
    email = request.data.get("email")
    subject = request.data.get("subject")
    message = request.data.get("message")

    final_message = f"Username: {request.user.username}\nEmail: {email} \nmessage: {message}"

    send_mail(
        subject,
        final_message,
        settings.DEFAULT_FROM_EMAIL,
        [settings.DEFAULT_FROM_EMAIL],
        fail_silently=False,
    )

    return Response({'detail': 'Message sent'})
