from rest_framework import serializers

from relationships.models import AcceptedOffer




class AcceptedOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcceptedOffer
        fields = ['id', 'business_offer', 'agent', 'acceptance_date', 'commission_rate', 'status']
        read_only_fields = ['acceptance_date', 'status']

class AcceptedOfferCreateSerializer(serializers.ModelSerializer):
    class Meta(AcceptedOfferSerializer.Meta):
        fields = ['business_offer', 'agent']