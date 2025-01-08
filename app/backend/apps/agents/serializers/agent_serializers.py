from rest_framework import serializers

from agents.models import Agent
from .agent_profile_serializers import AgentProfileSerializer
        
# Agent Serializers
class AgentSerializer(serializers.ModelSerializer):
    profile = AgentProfileSerializer()
    class Meta:
        model = Agent
        fields = ['id', 'code', 'first_name', 'last_name', 'email', 'phone_number', 'is_active', 'profile', 'user', 'created_at', 'updated_at']
        depth = 1
    

class AgentCreateSerializer(serializers.ModelSerializer):
    class Meta(AgentSerializer.Meta):
        fields = ['user' ,'first_name', 'last_name', 'email', 'phone_number']  # Exclude related fields
