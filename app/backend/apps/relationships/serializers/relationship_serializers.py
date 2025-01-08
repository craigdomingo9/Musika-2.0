from rest_framework import serializers

from relationships.models import BusinessAgentRelationship
from agents.serializers import AgentSerializer


class BusinessAgentRelationshipSerializer(serializers.ModelSerializer):
    agent = AgentSerializer(read_only=True)
    class Meta:
        model = BusinessAgentRelationship
        fields = ['id', 'commission_rate', 'status', 'business', 'agent', 'created_at']  # or specify the fields you want to include
        depth = 1

class BusinessAgentRelationshipCreateSerializer(serializers.ModelSerializer):
    class Meta(BusinessAgentRelationshipSerializer.Meta):
        fields = ['business', 'agent']
