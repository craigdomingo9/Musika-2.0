from rest_framework import serializers

from .variant_attribute_serializers import (
    VariantAttributeSerializer
)
from .product_image_serializers import (
  ProductImageSerializer
)
from business.models import (
    Product, 
    ProductVariant, 
)


class ProductVariantSerializer(serializers.ModelSerializer):
    attributes = VariantAttributeSerializer(many=True)
    image = ProductImageSerializer(read_only=True)
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all()) 
    
    class Meta:
        model = ProductVariant
        fields = ['id', 'product', 'stock_quantity', 'price', 'on_sale', 'sale_price', 'image', 'attributes']
        read_only_fields = ['id', 'attributes']
