from rest_framework import serializers

from .models import (
    Business, 
    Profile, 
    Location, 
    Category, 
    Catalog, 
    ProductReview, 
    Product, 
    ProductImage, 
    ProductVariant, 
    VariantAttribute
)

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = ['id', 'code', 'created_at', 'updated_at', 'profile']
        depth = 1
    
class BusinessCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = "__all__"
        read_only_fields = ['code']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        depth = 1

class ProfileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'business', 'name', 'description', 'categories', 'logo', 'cover_photo', 'phone_number', 'email', 'website', 'business_type']


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CatalogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Catalog
        fields = '__all__'



class VariantAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VariantAttribute
        fields = ['id', 'name', 'value']
        read_only_fields = ['id']
        
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class ProductVariantSerializer(serializers.ModelSerializer):
    attributes = VariantAttributeSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = ProductVariant
        fields = ['id', 'stock_quantity', 'price', 'on_sale', 'sale_price', 'images', 'attributes']
        read_only_fields = ['id']
        


class ProductSerializer(serializers.ModelSerializer):
    variants = ProductVariantSerializer(many=True, read_only=True, source='variant')
    category = CategorySerializer(read_only=True)
    catalog = CatalogSerializer(read_only=True)
    business = BusinessSerializer(read_only=True)
    
    class Meta:
        model = Product
        fields = fields = ['id', 'category', 'catalog', 'business', 'name', 'description', 'is_featured', 'created_at', 'updated_at', 'variants']
        read_only_fields = ['id', 'created_at', 'updated_at']

class ProductReviewSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ProductReview
        fields = ['id', 'content', 'rating', 'product', 'user']
        read_only_fields = ['id', 'product', 'user']

