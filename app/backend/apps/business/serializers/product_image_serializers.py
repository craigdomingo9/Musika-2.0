from rest_framework import serializers

from business.models import (
    ProductImage, 
    ProductVariant, 
)



class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    variant = serializers.PrimaryKeyRelatedField(queryset=ProductVariant.objects.all()) 
    
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'variant', 'created_at', 'updated_at']
    
    def get_image(self, obj):
        # Return relative URL instead of absolute URL
        return obj.image.url.replace(f'http://{self.context.get("request").get_host()}', '')


class ProductImageCreateSerializer(serializers.ModelSerializer):
    class Meta(ProductImageSerializer.Meta):
        fields = ['image', 'variant'] 
    