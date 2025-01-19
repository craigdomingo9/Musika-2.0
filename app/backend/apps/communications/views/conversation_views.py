from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.db import IntegrityError, transaction

from communications.filters import ConversationFilter
from communications.models import (
    Conversation, 
    Participant
)
from communications.serializers import (
    ConversationSerializer, 
    ConversationCreateSerializer,
)

User = get_user_model()

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
    
    
    @action(detail=True, methods=['post'], url_path='add-admins') 
    def add_admins(self, request, pk=None, *args, **kwargs):
        """
        Add all admin users to the conversation.

        Args:
            request: The incoming request object.
            pk: The UUID of the conversation.

        Returns:
            Response: A Response object indicating success or failure.
        """
        try:
            with transaction.atomic():
                conversation = self.get_object() 
                admin_users = User.objects.filter(is_admin=True)

                # Check if participants already exist for these admin users
                existing_participant_users = Participant.objects.filter(
                    conversation=conversation, 
                    user__in=admin_users
                ).values_list('user__id', flat=True)

                for admin_user in admin_users:
                    if admin_user.id not in existing_participant_users:
                        Participant.objects.create(
                            conversation=conversation,
                            user=admin_user,
                            role='platform', 
                        )
                        
                return Response({'status': 'Admins added successfully'}, status=status.HTTP_201_CREATED) 

        except Conversation.DoesNotExist:
            return Response({'error': 'Conversation not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e: 
            return Response({'error': f'An error occurred: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)