from rest_framework.routers import DefaultRouter
from .views import (
    BusinessAgentRelationshipViewSet,
    AgentApplicationViewSet,
    BusinessOfferViewSet,
    AcceptedOfferViewSet
)

router = DefaultRouter()
router.register(r'business-agent-relationships', BusinessAgentRelationshipViewSet)
router.register(r'agent-applications', AgentApplicationViewSet)
router.register(r'business-offers', BusinessOfferViewSet)
router.register(r'accepted-offers', AcceptedOfferViewSet)

urlpatterns = [
    
] + router.urls