# serializers.py
from rest_framework import serializers
from .models import (
    Conversation, 
    Participant, 
    Message, 
    Role
)



class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = '__all__'
        depth = 1

class MessageSerializer(serializers.ModelSerializer):
    sender = ParticipantSerializer(read_only=True)
    class Meta:
        model = Message
        fields = ['id', 'content', 'sent_at', 'was_read', 'was_read_at', 'conversation', 'sender']
        read_only_fields = ['id', 'sent_at', 'was_read_at', 'created_at']

class ConversationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Conversation
        fields = ['id', 'uuid', 'participants', 'conversation_type', 'title', 'created_at']
        read_only_fields = ['id', 'uuid', 'participants', 'created_at']
        depth = 1
