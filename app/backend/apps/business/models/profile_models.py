from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from .business_models import Business
from business.utils.models import (
    get_field_args, 
)




"""   Business Profile   """
class Profile(models.Model):
    business = models.OneToOneField(Business, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(**get_field_args(null=False,blank=False))
    description = models.TextField(**get_field_args(max_length=1000))
    categories = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='images/business/logos', blank=True)
    cover_photo = models.ImageField(upload_to='images/business/covers', blank=True)
    phone_number = PhoneNumberField(null=True, blank=True, unique=True)
    email = models.EmailField(unique=True)
    website = models.URLField(**get_field_args())
    business_type = models.CharField(max_length=50, choices=[('retail', 'Retail'), ('service', 'Service')])
    
    class Meta:
        ordering = ['name']
        
    def __str__(self) -> str:
        return self.name
