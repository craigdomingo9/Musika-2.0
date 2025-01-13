from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    # AcquisitionViewSet,
    # InteractionViewSet,
    # ProductAnalyticsViewSet,
    # AgentAnalyticsViewSet,
    # BusinessAnalyticsViewSet,
)

router = DefaultRouter()
# router.register(r'acquisitions', AcquisitionViewSet)
# router.register(r'interactions', InteractionViewSet)
# router.register(r'product-analytics', ProductAnalyticsViewSet)
# router.register(r'agent-analytics', AgentAnalyticsViewSet)
# router.register(r'business-analytics', BusinessAnalyticsViewSet)


urlpatterns = [
    
] + router.urls
