from django.db import models

from .business_models import Business
from business.utils.models import (
    get_field_args, 
    get_default_operating_hours
    
)


"""   Business Location   """
class Location(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name="locations")
    name = models.CharField(max_length=50, blank=False, default="Main Location")
    address = models.CharField(**get_field_args())
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    city = models.CharField(**get_field_args())
    country = models.CharField(default='Zimbabwe', **get_field_args())
    operating_hours = models.JSONField(blank=True, default=get_default_operating_hours)

        
    def __str__(self) -> str:
        return f"{self.name} - {self.address}, {self.city}"
