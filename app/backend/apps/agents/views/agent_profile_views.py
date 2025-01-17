from rest_framework import viewsets
from django_filters import rest_framework as filters

from agents.filters import AgentProfileFilter
from agents.models import AgentProfile
from agents.serializers import (
    AgentProfileSerializer, 
    AgentProfileCreateSerializer
)


class AgentProfileViewSet(viewsets.ModelViewSet):
    queryset = AgentProfile.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AgentProfileFilter

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT']:
            return AgentProfileCreateSerializer
        return AgentProfileSerializer

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)
