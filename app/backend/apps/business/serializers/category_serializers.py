from rest_framework import serializers

from business.models import (
    Category,
)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'image', 'has_products']
    
    def get_has_products(self, obj):
      return obj.has_products()


