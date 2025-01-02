from rest_framework import viewsets
from django_filters import rest_framework as filters
from rest_framework.permissions import AllowAny

from business.models import (
    VariantAttribute
)
from business.serializers import (
    VariantAttributeSerializer,
)


class VariantAttributeViewSet(viewsets.ModelViewSet):
    queryset = VariantAttribute.objects.all()
    serializer_class = VariantAttributeSerializer
    permission_classes = [AllowAny,]