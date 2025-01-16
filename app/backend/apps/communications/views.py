from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework.response import Response
from django_filters import rest_framework as filters

from communications.filters import ConversationFilter, MessageFilter
from communications.models import (
    Conversation, 
    Participant, 
    Message, 
)
from communications.serializers import (
    ConversationSerializer, 
    ConversationCreateSerializer,
    ParticipantSerializer, 
    ParticipantCreateSerializer,
    MessageSerializer, 
    MessageCreateSerializer,
)

class ConversationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ConversationFilter
    lookup_field = 'uuid'
    
    def get_serializer_class(self):
        if self.action in ["create", "update"]:
            self.serializer_class = ConversationCreateSerializer
        return super().get_serializer_class()
    


class ParticipantViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
    
    def get_serializer_class(self):
        if self.action in ["create", "update"]:
            self.serializer_class = ParticipantCreateSerializer
        return super().get_serializer_class()


class MessageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = MessageFilter
    
    def get_serializer_class(self):
        if self.action in ["create", "update"]:
            self.serializer_class = MessageCreateSerializer
        return super().get_serializer_class()
    
    @action(detail=True, methods=['post'], url_path='mark-as-read')
    def mark_as_read(self):
        try:
            message = self.get_object()  # Fetch the message by primary key
            message.mark_as_read()  # Call the method to mark it as read
            return Response({'status': 'message marked as read'}, status=status.HTTP_200_OK)
        except Message.DoesNotExist:
            return Response({'error': 'Message not found'}, status=status.HTTP_404_NOT_FOUND)