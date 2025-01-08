from rest_framework import viewsets
from rest_framework.response import Response
from django_filters import rest_framework as filters
from rest_framework import status


from agents.models import Agent
from agents.serializers import (
    AgentSerializer, 
    AgentCreateSerializer
)


class AgentViewSet(viewsets.ModelViewSet):
    queryset = Agent.objects.all()
    lookup_field = 'user__uuid'

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT']:
            return AgentCreateSerializer
        return AgentSerializer
