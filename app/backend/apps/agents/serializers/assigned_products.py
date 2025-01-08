from rest_framework import serializers

from agents.models import AssignedProduct


# AssignedProduct Serializers
class AssignedProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignedProduct
        fields = '__all__'
        depth = 1

class AssignedProductCreateSerializer(serializers.ModelSerializer):
    class Meta(AssignedProductSerializer.Meta):
        fields = ['agent', 'product', 'status']  # Exclude timestamps
