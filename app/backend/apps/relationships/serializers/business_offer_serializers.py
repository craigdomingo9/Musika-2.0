from rest_framework import serializers

from relationships.models import BusinessOffer
from agents.serializers import AgentSerializer
from business.serializers import BusinessSerializer



class BusinessOfferSerializer(serializers.ModelSerializer):
    agent = AgentSerializer(read_only=True)
    business = BusinessSerializer(read_only=True)
    class Meta:
        model = BusinessOffer
        fields = '__all__'

class BusinessOfferCreateSerializer(serializers.ModelSerializer):
    class Meta(BusinessOfferSerializer.Meta):
        fields = ['business', 'agent', 'title', 'description', 'offered_commission']
