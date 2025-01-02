from rest_framework import viewsets
from django_filters import rest_framework as filters
from rest_framework.permissions import AllowAny

from business.pagination import ProductPagination
from business.filters import (
    ProductFilter,
)
from business.models import (
    Product,
)
from business.serializers import (
    ProductSerializer,
)




class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny,]
    pagination_class = ProductPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProductFilter
    
    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)

