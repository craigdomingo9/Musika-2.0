from rest_framework import serializers

from business.models import (
    Product, 
)
from .product_variant_serializers import (
    ProductVariantSerializer
)




class ProductSerializer(serializers.ModelSerializer):
    variants = ProductVariantSerializer(many=True, read_only=True, source='variant')

    class Meta:
        model = Product
        fields = ['id', 'uuid', 'category', 'catalog', 'business', 'name', 'description', 'is_featured', 'created_at', 'updated_at', 'variants', 'reviews']
        read_only_fields = ['id', 'uuid', 'created_at', 'updated_at', 'variants', 'reviews']
