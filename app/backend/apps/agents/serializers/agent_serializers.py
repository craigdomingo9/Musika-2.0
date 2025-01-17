from rest_framework import serializers
from django.contrib.auth import get_user_model

from agents.models import Agent, AgentProfile
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
    profile = AgentProfileSerializer()
    
    class Meta(AgentSerializer.Meta):
        fields = ['first_name', 'last_name', 'email', 'phone_number', 'profile']
    
    def create(self, validated_data):
        """
        Create a new Agent instance and its associated Profile.

        Args:
            validated_data: The validated data from the serializer.

        Returns:
            The newly created Agent instance.
        """
        profile_data = validated_data.pop('profile', {}) 
        agent = Agent.objects.create(**validated_data) 
        AgentProfile.objects.create(agent=agent, **profile_data)
         
        return agent 
    
    def update(self, instance, validated_data):
        """
        Update the Agent and its associated Profile.

        Args:
            instance: The Agent instance to be updated.
            validated_data: The validated data from the serializer.

        Returns:
            The updated Agent instance.
        """
        profile_data = validated_data.pop('profile', {}) 
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email) 
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.save()

        # Update the associated Profile
        for key, value in profile_data.items():
            setattr(instance.profile, key, value)
        instance.profile.save()

        return instance
