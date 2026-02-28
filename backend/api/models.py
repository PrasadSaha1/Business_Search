from django.db import models
from django.conf import settings

class GlobalBusiness(models.Model):
    # This is made one time when a user first saves or leaves a review with a business
    id = models.CharField(max_length=255, primary_key=True) # From the API, will look like 0x8085808b287f3b3b:0xa49802f84f7ddb35
    name = models.CharField(max_length=255, null=True)  # null=True allows it to be empty, which is neccesary as sometimes the API doesn't give information
    address = models.CharField(max_length=500, null=True)
    phone_number = models.CharField(max_length=50, null=True)
    website = models.URLField(null=True)

class SavedBusiness(models.Model):
    # This is the businsses a user has saved 
    business = models.ForeignKey(GlobalBusiness, on_delete=models.CASCADE, related_name="saved_business")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="saved_business")

    # Each user can only save each business once
    class Meta:
        unique_together = ('user', 'business')


class Review(models.Model):
    business = models.ForeignKey(GlobalBusiness, on_delete=models.CASCADE, related_name="reviews")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reviews")

    name = models.CharField(max_length=100)  # The name entered by the user (probably their real name rather than their username)
    rating = models.IntegerField()  # 1-5
    review_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
