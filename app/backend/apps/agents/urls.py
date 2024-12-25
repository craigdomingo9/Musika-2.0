from rest_framework.routers import DefaultRouter
from .views import (
    AgentViewSet,
    AgentProfileViewSet,
    PreferencesViewSet,
    AssignedProductViewSet,
    LeadViewSet,
    LeadSourceViewSet,
)

router = DefaultRouter()
router.register(r'agents', AgentViewSet)
router.register(r'agent-profiles', AgentProfileViewSet)
router.register(r'preferences', PreferencesViewSet)
router.register(r'assigned-products', AssignedProductViewSet)
router.register(r'leads', LeadViewSet)
router.register(r'lead-sources', LeadSourceViewSet)

urlpatterns = [
    
] + router.urls
