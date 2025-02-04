from django.db import models
from django.contrib.auth import get_user_model

from business.utils.models import (
    generate_unique_code,
     
)

User = get_user_model()

def generate_code():
    return generate_unique_code(Business)



"""   Business   """
class Business(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='business_profile')
    code = models.CharField(max_length=8,default=generate_code)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']
        verbose_name_plural = "Businesses"
    
    def __str__(self) -> str:
        profile_name = getattr(self, 'profile', None)  # Attempt to get profile attribute
        if profile_name and hasattr(profile_name, 'name'):
            return f"{profile_name.name}"
        else:
            return f"{self.user.username + "'s business'"}"


