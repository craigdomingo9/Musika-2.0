from rest_framework import viewsets
from django_filters import rest_framework as filters
from rest_framework.permissions import AllowAny

from business.filters import (
    ProductVariantFilter
)
from business.models import (
    ProductVariant,
)
from business.serializers import (
    ProductVariantSerializer,
)


class ProductVariantViewSet(viewsets.ModelViewSet):
    queryset = ProductVariant.objects.all()
    serializer_class = ProductVariantSerializer
    permission_classes = [AllowAny,]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProductVariantFilter

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)

