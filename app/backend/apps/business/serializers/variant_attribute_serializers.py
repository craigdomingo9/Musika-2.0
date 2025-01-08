from rest_framework import serializers


from business.models import (
    VariantAttribute,
    ProductVariant
)



class VariantAttributeSerializer(serializers.ModelSerializer):
    variant = serializers.PrimaryKeyRelatedField(queryset=ProductVariant.objects.all()) 
  
    class Meta:
        model = VariantAttribute
        fields = ['id', 'name', 'value', 'variant']
        read_only_fields = ['id']

