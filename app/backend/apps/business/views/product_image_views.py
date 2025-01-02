from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from business.models import (
    ProductImage,
)
from business.serializers import (
    ProductImageSerializer,
    ProductImageCreateSerializer,
)



class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = [AllowAny,]
    
    def get_serializer_context(self):
        return {'request': self.request}
      
    def get_serializer_class(self):
        if self.action in ["create", "update"]:
            self.serializer_class = ProductImageCreateSerializer
        return super().get_serializer_class()
