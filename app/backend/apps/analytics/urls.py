from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    LeadViewSet,
    LeadSourceViewSet
)

router = DefaultRouter()
router.register(r'leads', LeadViewSet)
router.register(r'lead-sources', LeadSourceViewSet)


urlpatterns = [
    
] + router.urls
