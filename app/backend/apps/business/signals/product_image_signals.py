from django.db.models.signals import post_save
from django.dispatch import receiver

from business.models import (
  ProductImage, 
  VariantAttribute
)



@receiver(post_save, sender=ProductImage)
def product_image_created_or_updated(sender, instance, created, **kwargs):
    if created:
      product_image = ProductImage.objects.get(id=instance.pk)
      attributes = VariantAttribute.objects.filter(variant=instance.variant).first()
      product_image.alt_text = (
        f"{instance.variant.product.name} - {attributes.value} {attributes.name}"
        if attributes and attributes.value and attributes.name
        else instance.variant.product.name
      )
      product_image.save(update_fields=['alt_text'])