from rest_framework import viewsets
from django_filters import rest_framework as filters
from .filters import (
    ProductFilter,
    BusinessProfileFilter,
    BusinessLocationFilter,
    ProductReviewFilter,
    CatalogFilter
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
    
    def get_serializer_class(self):
        if self.action in ["create"]:
            self.serializer_class = BusinessCreateSerializer
            
        return super().get_serializer_class()


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = BusinessProfileFilter
    
    def get_serializer_class(self):
        if self.action in ["create"]:
            self.serializer_class = ProfileCreateSerializer
        return super().get_serializer_class()


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = BusinessLocationFilter


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CatalogViewSet(viewsets.ModelViewSet):
    queryset = Catalog.objects.all()
    serializer_class = CatalogSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CatalogFilter


class ProductReviewViewSet(viewsets.ModelViewSet):
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProductReviewFilter


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProductFilter


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer


class ProductVariantViewSet(viewsets.ModelViewSet):
    queryset = ProductVariant.objects.all()
    serializer_class = ProductVariantSerializer


class VariantAttributeViewSet(viewsets.ModelViewSet):
    queryset = VariantAttribute.objects.all()
    serializer_class = VariantAttributeSerializer