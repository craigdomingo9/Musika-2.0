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




class ProfileSerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ['id', 'business', 'name', 'description', 'categories', 'logo', 'cover_photo', 'phone_number', 'email', 'website', 'business_type']
        depth = 1
        
    def get_logo(self, obj):
        # Return relative URL instead of absolute URL
        return obj.logo.url.replace(f'http://{self.context.get("request").get_host()}', '')

class BusinessSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    class Meta:
        model = Business
        fields = ['id', 'code', 'created_at', 'updated_at', 'profile']
        depth = 1
    
class BusinessCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = "__all__"
        read_only_fields = ['code']



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
        fields = ['id', 'name', 'description', 'image', 'has_products']
    
    def get_has_products(self, obj):
      return obj.has_products()



class VariantAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VariantAttribute
        fields = ['id', 'name', 'value']
        read_only_fields = ['id']
        
class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_image(self, obj):
        # Return relative URL instead of absolute URL
        return obj.image.url.replace(f'http://{self.context.get("request").get_host()}', '')


class ProductVariantSerializer(serializers.ModelSerializer):
    attributes = VariantAttributeSerializer(many=True, read_only=True)
    image = ProductImageSerializer(read_only=True)
    
    class Meta:
        model = ProductVariant
        fields = ['id', 'stock_quantity', 'price', 'on_sale', 'sale_price', 'image', 'attributes']
        read_only_fields = ['id']


class ProductReviewSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ProductReview
        fields = ['id', 'content', 'rating', 'product', 'user']
        read_only_fields = ['id', 'product', 'user']
        depth = 1


class ProductSerializer(serializers.ModelSerializer):
    variants = ProductVariantSerializer(many=True, read_only=True, source='variant')
    category = CategorySerializer(read_only=True)
    business = BusinessSerializer(read_only=True)
    reviews = ProductReviewSerializer(many=True,read_only=True)
    
    class Meta:
        model = Product
        fields = fields = ['id', 'uuid', 'category', 'catalog', 'business', 'name', 'description', 'is_featured', 'created_at', 'updated_at', 'variants', 'reviews']
        read_only_fields = ['id', 'uuid', 'created_at', 'updated_at']


class CatalogSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = Catalog
        fields = ['id', 'name', 'description', 'category', 'products']
    
