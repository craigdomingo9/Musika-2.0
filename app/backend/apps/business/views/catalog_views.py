from rest_framework import viewsets
from django_filters import rest_framework as filters
from rest_framework.permissions import AllowAny

from business.filters import (
    CatalogFilter,
)
from business.models import (
    Catalog,
)
from business.serializers import (
    CatalogSerializer,
)



class CatalogViewSet(viewsets.ModelViewSet):
    queryset = Catalog.objects.all()
    serializer_class = CatalogSerializer
    permission_classes = [AllowAny,]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CatalogFilter
