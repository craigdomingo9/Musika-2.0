from rest_framework.routers import DefaultRouter
from .views import (
    AgentViewSet,
    AgentProfileViewSet,
    PreferencesViewSet,
)

router = DefaultRouter()
router.register(r'agents', AgentViewSet)
router.register(r'agent-profiles', AgentProfileViewSet)
router.register(r'preferences', PreferencesViewSet)

urlpatterns = [
    
] + router.urls
