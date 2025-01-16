from rest_framework import serializers
from django.contrib.auth import get_user_model

from communications.models import (
  Participant,
  Conversation
)
from account.serializers import AccountSerializer
from business.serializers import BusinessSerializer
from agents.serializers import AgentSerializer


User = get_user_model()

class ParticipantAccountSerializer(serializers.ModelSerializer):
  business_profile = BusinessSerializer()
  agent_profile = AgentSerializer()
  
  class Meta(AccountSerializer.Meta):
      fields = ['business_profile', 'agent_profile', 'uuid', 'first_name', 'last_name', 'profile_picture', 'is_admin']
      depth = 1


class ParticipantSerializer(serializers.ModelSerializer):
    user = ParticipantAccountSerializer()
    class Meta:
        model = Participant
        fields = '__all__'
        depth = 1


class ParticipantCreateSerializer(serializers.ModelSerializer):
    conversation = serializers.PrimaryKeyRelatedField(queryset=Conversation.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    class Meta(ParticipantSerializer.Meta):
        fields = ['conversation', 'user', 'role']
        