from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from business.models import (
    Category,
)
from business.serializers import (
    CategorySerializer,
)



class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny,]
