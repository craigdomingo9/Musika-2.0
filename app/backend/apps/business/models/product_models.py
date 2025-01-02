from django.db import models
from django.contrib.postgres.indexes import GinIndex
import uuid

from .business_models import Business
from business.utils.models import (
    get_field_args, 
)


"""   Product   """
class Product(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4)
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name="products")
    catalog = models.ForeignKey('Catalog', on_delete=models.CASCADE, related_name="products")
    business = models.ForeignKey(Business, on_delete=models.CASCADE,related_name="products")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        indexes = [
            GinIndex(fields=['name'], name='gin_name_trgm_idx', opclasses=['gin_trgm_ops']),
            GinIndex(fields=['description'], name='gin_description_trgm_idx', opclasses=['gin_trgm_ops']),
        ]

    def __str__(self) -> str:
        return self.name



"""   Catalog   """
class Catalog(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name="catalogs")
    category = models.ForeignKey('Category', on_delete=models.CASCADE, null=True, blank=True, related_name="catalogs")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return self.name



"""   Category   """
class Category(models.Model):
    name = models.CharField(**get_field_args(blank=False))
    description = models.TextField(**get_field_args(max_length=300))
    image = models.ImageField(upload_to='images/business/category',blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        verbose_name_plural = "Categories"
    
    def __str__(self) -> str:
        return self.name
    
    @property
    def has_products(self):
        has_products = Product.objects.filter(category=self.id).exists()
        return has_products
      