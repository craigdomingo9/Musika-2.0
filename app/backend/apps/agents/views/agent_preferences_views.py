from rest_framework import viewsets
from django_filters import rest_framework as filters

from agents.filters import AgentPreferencesFilter
from agents.models import Preferences
from agents.serializers import (
    PreferencesSerializer, 
    PreferencesCreateSerializer
)

class PreferencesViewSet(viewsets.ModelViewSet):
    queryset = Preferences.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AgentPreferencesFilter

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT']:
            return PreferencesCreateSerializer
        return PreferencesSerializer
