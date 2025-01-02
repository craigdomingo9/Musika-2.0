from rest_framework import serializers


from business.models import (
    VariantAttribute
)



class VariantAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VariantAttribute
        fields = ['id', 'name', 'value']
        read_only_fields = ['id']

