from rest_framework import viewsets
from django_filters import rest_framework as filters
from rest_framework.permissions import AllowAny

from business.filters import (
  ProductReviewFilter,
)
from business.models import (
    ProductReview,
)
from business.serializers import (
    ProductReviewSerializer,
)



class ProductReviewViewSet(viewsets.ModelViewSet):
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewSerializer
    permission_classes = [AllowAny,]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProductReviewFilter
