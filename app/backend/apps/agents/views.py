from rest_framework import viewsets
from rest_framework.response import Response
from django_filters import rest_framework as filters
from rest_framework import status
from .filters import (
    AgentProfileFilter,
    AgentPreferencesFilter,
    AssignedProductsFilter,
    LeadFilter
)
from .models import (
    Agent,
    AgentProfile,
    Preferences,
    AssignedProduct,
    Lead,
    LeadSource
)
from .serializers import (
    AgentSerializer, AgentCreateSerializer,
    AgentProfileSerializer, AgentProfileCreateSerializer,
    PreferencesSerializer, PreferencesCreateSerializer,
    AssignedProductSerializer, AssignedProductCreateSerializer,
    LeadSerializer, LeadCreateSerializer,
    LeadSourceSerializer, LeadSourceCreateSerializer,
)


class AgentViewSet(viewsets.ModelViewSet):
    queryset = Agent.objects.all()
    lookup_field = 'user__uuid'

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT']:
            return AgentCreateSerializer
        return AgentSerializer

class AgentProfileViewSet(viewsets.ModelViewSet):
    queryset = AgentProfile.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AgentProfileFilter

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT']:
            return AgentProfileCreateSerializer
        return AgentProfileSerializer

class PreferencesViewSet(viewsets.ModelViewSet):
    queryset = Preferences.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AgentPreferencesFilter

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT']:
            return PreferencesCreateSerializer
        return PreferencesSerializer

class AssignedProductViewSet(viewsets.ModelViewSet):
    queryset = AssignedProduct.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AssignedProductsFilter

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT']:
            return AssignedProductCreateSerializer
        return AssignedProductSerializer

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