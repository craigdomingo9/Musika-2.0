from rest_framework import viewsets
from django_filters import rest_framework as filters

from relationships.filters import AssignedProductsFilter
from relationships.models import AssignedProduct
from relationships.serializers import (
    AssignedProductSerializer, 
    AssignedProductCreateSerializer,
)

class AssignedProductViewSet(viewsets.ModelViewSet):
    queryset = AssignedProduct.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AssignedProductsFilter

    def get_serializer_class(self):
        if self.action in ['create', 'update']:
            return AssignedProductCreateSerializer
        return AssignedProductSerializer
