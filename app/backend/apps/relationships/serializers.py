from rest_framework import serializers
from .models import BusinessAgentRelationship, AcceptedOffer, AgentApplication, BusinessOffer

class BusinessAgentRelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessAgentRelationship
        fields = '__all__'  # or specify the fields you want to include

class BusinessAgentRelationshipCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessAgentRelationship
        fields = ['business', 'agent']  # Specify fields for creation

class AgentApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentApplication
        fields = '__all__'

class AgentApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentApplication
        fields = ['agent', 'business', 'commission_rate']

class BusinessOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessOffer
        fields = '__all__'

class BusinessOfferCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessOffer
        fields = ['business', 'agent', 'title', 'description', 'offered_commission']

class AcceptedOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcceptedOffer
        fields = ['id', 'business_offer', 'agent', 'acceptance_date', 'commission_rate', 'status']
        read_only_fields = ['acceptance_date', 'status']

class AcceptedOfferCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcceptedOffer
        fields = ['business_offer', 'agent']