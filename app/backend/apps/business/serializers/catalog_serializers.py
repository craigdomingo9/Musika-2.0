from rest_framework import serializers

from .product_serializers import (
    ProductSerializer
)
from business.models import (
    Catalog,
    Business
)



class CatalogSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    business = serializers.PrimaryKeyRelatedField(queryset=Business.objects.all()) 
    
    class Meta:
        model = Catalog
        fields = ['id', 'name', 'business', 'description', 'category', 'products']

