from rest_framework import serializers

from relationships.models import Assignment
from agents.models import Agent
from business.models import Product

from business.serializers import ProductSerializer
from agents.serializers import AgentSerializer

# Assignment Serializers
class AssignmentSerializer(serializers.ModelSerializer):
    agent = AgentSerializer(read_only=True)
    product = ProductSerializer(read_only=True)
    class Meta:
        model = Assignment
        fields = '__all__'

class AssignmentCreateSerializer(serializers.ModelSerializer):
    agent = serializers.PrimaryKeyRelatedField(queryset=Agent.objects.all())
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    class Meta(AssignmentSerializer.Meta):
        fields = ['agent', 'product']
