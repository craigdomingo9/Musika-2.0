from rest_framework.routers import DefaultRouter
from .views import (
    ConversationViewSet,
    ParticipantViewSet,
    MessageViewSet,
    RoleViewSet
)

router = DefaultRouter()
router.register(r'conversations', ConversationViewSet)
router.register(r'participants', ParticipantViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'role', RoleViewSet)

urlpatterns = [
    
] + router.urls
