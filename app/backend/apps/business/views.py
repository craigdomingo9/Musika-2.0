from rest_framework import viewsets
from django_filters import rest_framework as filters
from rest_framework.permissions import AllowAny
from .pagination import ProductPagination
from .filters import (
    ProductFilter,
    BusinessProfileFilter,
    BusinessLocationFilter,
    ProductReviewFilter,
    CatalogFilter,
    BusinessFilter
)
from .models import (
    Business,
    Profile,
    Location,
    Category,
    Catalog,
    ProductReview,
    Product,
    ProductImage,
    ProductVariant,
    VariantAttribute
)
from .serializers import (
    BusinessSerializer,
    BusinessCreateSerializer,
    ProfileSerializer,
    ProfileCreateSerializer,
    LocationSerializer,
    CategorySerializer,
    CatalogSerializer,
    ProductReviewSerializer,
    ProductSerializer,
    ProductImageSerializer,
    ProductVariantSerializer,
    VariantAttributeSerializer,
)



class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    permission_classes = [AllowAny,]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = BusinessFilter
    lookup_field = "code"
    
    def get_serializer_class(self):
        if self.action in ["create"]:
            self.serializer_class = BusinessCreateSerializer
            
        return super().get_serializer_class()


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny,]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = BusinessProfileFilter
    
    def get_serializer_context(self):
        return {'request': self.request}
    
    def get_serializer_class(self):
        if self.action in ["create"]:
            self.serializer_class = ProfileCreateSerializer
        return super().get_serializer_class()


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [AllowAny,]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = BusinessLocationFilter


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny,]


class CatalogViewSet(viewsets.ModelViewSet):
    queryset = Catalog.objects.all()
    serializer_class = CatalogSerializer
    permission_classes = [AllowAny,]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CatalogFilter


class ProductReviewViewSet(viewsets.ModelViewSet):
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewSerializer
    permission_classes = [AllowAny,]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProductReviewFilter



class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny,]
    pagination_class = ProductPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProductFilter
    


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = [AllowAny,]
    
    def get_serializer_context(self):
        return {'request': self.request}


class ProductVariantViewSet(viewsets.ModelViewSet):
    queryset = ProductVariant.objects.all()
    serializer_class = ProductVariantSerializer
    permission_classes = [AllowAny,]


class VariantAttributeViewSet(viewsets.ModelViewSet):
    queryset = VariantAttribute.objects.all()
    serializer_class = VariantAttributeSerializer
    permission_classes = [AllowAny,]