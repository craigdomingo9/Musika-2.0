from rest_framework import serializers

from relationships.models import AgentApplication
from agents.serializers import AgentSerializer
from business.serializers import BusinessSerializer



class AgentApplicationSerializer(serializers.ModelSerializer):
    agent = AgentSerializer(read_only=True)
    business = BusinessSerializer(read_only=True)
    class Meta:
        model = AgentApplication
        fields = '__all__'

class AgentApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta(AgentApplicationSerializer.Meta):
        fields = ['agent', 'business', 'commission_rate']
