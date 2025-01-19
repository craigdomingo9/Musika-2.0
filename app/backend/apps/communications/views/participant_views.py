from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets

from communications.models import (
    Participant, 
)
from communications.serializers import (
    ParticipantSerializer, 
    ParticipantCreateSerializer,
)


class ParticipantViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
    
    def get_serializer_class(self):
        if self.action in ["create", "update"]:
            self.serializer_class = ParticipantCreateSerializer
        return super().get_serializer_class()


