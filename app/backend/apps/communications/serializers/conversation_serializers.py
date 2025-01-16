from rest_framework import serializers

from communications.models import (
  Conversation,
)
from .participant_serializers import ParticipantSerializer



class ConversationSerializer(serializers.ModelSerializer):
    participants = ParticipantSerializer(many=True)
    
    class Meta:
        model = Conversation
        fields = ['id', 'uuid', 'participants', 'conversation_type', 'title', 'created_at']
        depth = 1


class ConversationCreateSerializer(serializers.ModelSerializer):
    
    class Meta(ConversationSerializer.Meta):
        fields = ['id', 'conversation_type', 'title']