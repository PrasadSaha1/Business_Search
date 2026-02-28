from django.urls import path
from .views import *

urlpatterns = [
    path('user_view/', user_view, name='user_view'),
    path('forgot_username/', forgot_username, name='forgot_username'),
    path('forgot_password/', forgot_password, name='forgot_password'),
    path("check_login/", check_login, name="check_login"),
    path("reset_password_confirm/", reset_password_confirm, name="reset_password_confirm"),
    path('delete_account/', delete_account, name='delete_account'),
    path('change_username/', change_username, name='change_username'),
    path('change_password/', change_password, name='change_password'),
    path('add_email/', add_email, name='add_email'),
    path('change_email/', change_email, name='change_email'),
    path('contact_us/', contact_us, name='contact_us'),
    path('create_review/', CreateReviewView.as_view(), name='create_review'),
    path("businesses/<str:business_id>/reviews/", BusinessReviewsView.as_view(), name="business_reviews"),
    path("view_business_rating/", view_business_rating, name="view_business_rating"),
    path("check_if_review_left/", check_if_review_left, name="check_if_review_left"),
    path("save_business/", save_business, name="save_business"),
    path("get_saved_businesses/", get_saved_businesses, name="get_saved_businesses"),
    path("delete_review/", delete_review, name="delete_review"),
    path("fetch_average_rating_and_save_status/", fetch_average_rating_and_save_status, name="fetch_average_rating_and_save_status"),
    path("unsave_business/", unsave_business, name="unsave_business"),
]
