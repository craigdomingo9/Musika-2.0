from rest_framework import viewsets
from django_filters import rest_framework as filters

from agents.filters import AssignedProductsFilter
from agents.models import AssignedProduct
from agents.serializers import (
    AssignedProductSerializer, 
    AssignedProductCreateSerializer,
)

class AssignedProductViewSet(viewsets.ModelViewSet):
    queryset = AssignedProduct.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AssignedProductsFilter

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT']:
            return AssignedProductCreateSerializer
        return AssignedProductSerializer
