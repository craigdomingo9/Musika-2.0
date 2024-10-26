from rest_framework.routers import DefaultRouter
from .views import (
    BusinessViewSet,
    ProfileViewSet,
    LocationViewSet,
    CategoryViewSet,
    CatalogViewSet,
    ProductReviewViewSet,
    ProductViewSet,
    ProductImageViewSet,
    ProductVariantViewSet,
    VariantAttributeViewSet,
)

router = DefaultRouter()
router.register(r'businesses', BusinessViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'locations', LocationViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'catalogs', CatalogViewSet)
router.register(r'reviews', ProductReviewViewSet)
router.register(r'products', ProductViewSet)
router.register(r'product-images', ProductImageViewSet)
router.register(r'variants', ProductVariantViewSet)
router.register(r'attributes', VariantAttributeViewSet)

urlpatterns = [

] + router.urls