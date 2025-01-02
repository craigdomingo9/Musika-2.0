from rest_framework import serializers

from business.models import (
    ProductReview, 
    Product, 
)




class ProductReviewSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all()) 
    
    class Meta:
        model = ProductReview
        fields = ['id', 'content', 'rating', 'product', 'user']
        read_only_fields = ['id', 'product', 'user']
        depth = 1
