from django.db import models

from business.utils.models import (
    get_field_args
)



"""   Product Variant   """
class ProductVariant(models.Model):
    product = models.ForeignKey("Product", on_delete=models.CASCADE, related_name="variant")
    stock_quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2,blank=True )
    on_sale = models.BooleanField(default=False)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2,blank=True,null=True) 

    def __str__(self):
        variant = VariantAttribute.objects.filter(variant=self.id).first()
        return (
            f"{self.product.name} - {variant.value} {variant.name}"
            if variant and variant.value and variant.name
            else self.product.name
        )


"""   Variant Attribute   """
class VariantAttribute(models.Model):
    variant = models.ForeignKey("ProductVariant", on_delete=models.CASCADE, related_name="attributes")
    name = models.CharField(**get_field_args(blank=False,null=False))
    value = models.CharField(**get_field_args(blank=False,null=False))

    def __str__(self) -> str:
        return f"{self.variant.product.name} - {self.name}: {self.value}"
