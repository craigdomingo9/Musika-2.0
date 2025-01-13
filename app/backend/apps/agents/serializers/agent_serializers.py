from rest_framework import serializers
from django.contrib.auth import get_user_model

from agents.models import Agent
from .agent_profile_serializers import AgentProfileSerializer
        
User = get_user_model()

# Agent Serializers
class AgentSerializer(serializers.ModelSerializer):
    profile = AgentProfileSerializer()
    full_name = serializers.SerializerMethodField()
    class Meta:
        model = Agent
        fields = ['id', 'code', 'full_name', 'first_name', 'last_name', 'email', 'phone_number', 'is_active', 'profile', 'user', 'created_at', 'updated_at']
        depth = 1
    
    def get_full_name(self, obj):
      return obj.full_name()
    

class AgentCreateSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta(AgentSerializer.Meta):
        fields = ['user' ,'first_name', 'last_name', 'email', 'phone_number']  # Exclude related fields
