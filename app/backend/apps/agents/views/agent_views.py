from rest_framework import viewsets
from django_filters import rest_framework as filters


from agents.models import Agent
from agents.filters import AgentFilter
from agents.serializers import (
    AgentSerializer, 
    AgentCreateSerializer
)


class AgentViewSet(viewsets.ModelViewSet):
    queryset = Agent.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AgentFilter
    lookup_field = 'user__uuid'
    
    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT']:
            return AgentCreateSerializer
        return AgentSerializer
