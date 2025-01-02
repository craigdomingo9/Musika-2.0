from rest_framework import viewsets
from django_filters import rest_framework as filters
from rest_framework.permissions import AllowAny

from business.filters import (
    BusinessLocationFilter,
)
from business.models import (
    Location,
)
from business.serializers import (
    LocationSerializer,
)


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [AllowAny,]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = BusinessLocationFilter

