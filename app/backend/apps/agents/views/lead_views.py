from rest_framework import viewsets
from rest_framework.response import Response
from django_filters import rest_framework as filters
from rest_framework import status

from agents.filters import LeadFilter
from agents.models import (
    Agent,
    Lead,
    LeadSource
)
from agents.serializers import (
    LeadSerializer, 
    LeadCreateSerializer,
    LeadSourceSerializer, 
    LeadSourceCreateSerializer,
)

class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = LeadFilter

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT']:
            return LeadCreateSerializer
        return LeadSerializer
    
    def create(self, request, *args, **kwargs):
        # Get the user from the session
        user = request.user  # Assuming the user is already authenticated and set in request.user
        agent = Agent.objects.get(user=user)
        
        # Create a lead instance with the user assigned
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            lead = serializer.save(agent=agent)  # Assign the current user as the agent
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LeadSourceViewSet(viewsets.ModelViewSet):
    queryset = LeadSource.objects.all()

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT']:
            return LeadSourceCreateSerializer
        return LeadSourceSerializer