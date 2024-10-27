from rest_framework import serializers
from .models import Agent, AgentProfile, Preferences, AssignedProduct, Lead, LeadSource

# Agent Serializers
class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = '__all__'
        depth = 1

class AgentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = ['user' ,'first_name', 'last_name', 'email', 'phone_number']  # Exclude related fields

# AgentProfile Serializers
class AgentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentProfile
        fields = '__all__'
        depth = 1

class AgentProfileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentProfile
        fields = ['agent', 'bio', 'profile_picture', 'minimum_commission_rate', 'social_links']  # Exclude related fields

# Preferences Serializers
class PreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preferences
        fields = '__all__'
        depth = 1

class PreferencesCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preferences
        fields = ['agent', 'communication_method', 'notifications_enabled', 'preferred_time_contact']

# AssignedProduct Serializers
class AssignedProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignedProduct
        fields = '__all__'
        depth = 1

class AssignedProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignedProduct
        fields = ['agent', 'product', 'status']  # Exclude timestamps

# Lead Serializers
class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = '__all__'
        depth = 1

class LeadCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ['agent', 'user', 'product', 'source', 'status']  # Exclude timestamps

# LeadSource Serializers
class LeadSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadSource
        fields = '__all__'
        depth = 1

class LeadSourceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadSource
        fields = ['name', 'description']  # Exclude timestamps