from rest_framework import serializers

from communications.models import Message
from .participant_serializers import ParticipantSerializer


class MessageSerializer(serializers.ModelSerializer):
    sender = ParticipantSerializer(read_only=True)
    class Meta:
        model = Message
        fields = ['id', 'content', 'sent_at', 'was_read', 'was_read_at', 'conversation', 'sender']

class MessageCreateSerializer(serializers.ModelSerializer):
    
    class Meta(MessageSerializer.Meta):
        fields = ['content', 'was_read', 'conversation', 'sender']
