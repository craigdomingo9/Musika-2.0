# serializers.py
from rest_framework import serializers

from .models import Conversation, Participant, Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'


class ParticipantSerializer(serializers.ModelSerializer):
    participant_messages = MessageSerializer(many=True, read_only=True)
    class Meta:
        model = Participant
        fields = '__all__'


class ConversationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Conversation
        fields = ['id', 'participants', 'title', 'created_at']
        depth = 1

class ConversationDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Conversation
        fields = ['id', 'participants', 'title', 'created_at', 'messages']
        depth = 2