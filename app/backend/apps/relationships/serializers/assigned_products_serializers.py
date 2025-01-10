from rest_framework import serializers

from relationships.models import AssignedProduct
from agents.models import Agent
from business.models import Product

from business.serializers import ProductSerializer
from agents.serializers import AgentSerializer

# AssignedProduct Serializers
class AssignedProductSerializer(serializers.ModelSerializer):
    agent = AgentSerializer(read_only=True)
    product = ProductSerializer(read_only=True)
    class Meta:
        model = AssignedProduct
        fields = '__all__'

class AssignedProductCreateSerializer(serializers.ModelSerializer):
    agent = serializers.PrimaryKeyRelatedField(queryset=Agent.objects.all())
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    class Meta(AssignedProductSerializer.Meta):
        fields = ['agent', 'product']
