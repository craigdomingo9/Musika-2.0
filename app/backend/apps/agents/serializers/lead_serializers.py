from rest_framework import serializers

from agents.models import (
  Lead, 
  LeadSource
)


# Lead Serializers
class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = '__all__'
        depth = 1

class LeadCreateSerializer(serializers.ModelSerializer):
    class Meta(LeadSerializer.Meta):
        fields = ['agent', 'user', 'product', 'source', 'status']  # Exclude timestamps

# LeadSource Serializers
class LeadSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadSource
        fields = '__all__'
        depth = 1

class LeadSourceCreateSerializer(serializers.ModelSerializer):
    class Meta(LeadSourceSerializer.Meta):
        fields = ['name', 'description']  # Exclude timestamps