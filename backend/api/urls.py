from django.urls import path
from .views import *

urlpatterns = [
    path('user_view/', user_view, name='user_view'),
    path('forgot_username/', forgot_username, name='forgot_username'),
    path('forgot_password/', forgot_password, name='forgot_password'),
    path("reset_password_confirm/", reset_password_confirm, name="reset_password_confirm"),
    path('delete_account/', delete_account, name='delete_account'),
    path('change_username/', change_username, name='change_username'),
    path('change_password/', change_password, name='change_password'),
    path('add_email/', add_email, name='add_email'),
    path('change_email/', change_email, name='change_email'),
    path('contact_us/', contact_us, name='contact_us'),
]