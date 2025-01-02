from rest_framework import viewsets
from django_filters import rest_framework as filters
from rest_framework.permissions import AllowAny

from business.filters import (
    BusinessFilter,
)
from business.models import (
    Business,
)
from business.serializers import (
    BusinessSerializer
)



class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    permission_classes = [AllowAny,]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = BusinessFilter
    lookup_field = "code"

