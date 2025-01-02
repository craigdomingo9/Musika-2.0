from django.db import models

from business.utils.models import (
    get_field_args 
)



"""   Product Image   """
class ProductImage(models.Model):
    variant = models.OneToOneField("ProductVariant", on_delete=models.CASCADE, related_name="image")
    image = models.ImageField(upload_to='images/business/products')
    alt_text = models.CharField(**get_field_args())
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.variant.product.name


