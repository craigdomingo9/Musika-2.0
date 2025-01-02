from rest_framework import serializers

from business.models import (
    Product, 
)
from .product_variant_serializers import (
    ProductVariantSerializer
)
from .business_serializers import BusinessSerializer



class ProductSerializer(serializers.ModelSerializer):
    variants = ProductVariantSerializer(many=True, read_only=True, source='variant')
    business = BusinessSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'uuid', 'category', 'catalog', 'business', 'name', 'description', 'is_featured', 'created_at', 'updated_at', 'variants', 'reviews']


class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta(ProductSerializer.Meta):
        fields = ['category', 'catalog', 'business', 'name', 'description']
