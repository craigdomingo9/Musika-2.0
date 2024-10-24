from django.urls import path
from rest_framework.routers import DefaultRouter


from .views import NotificationViewSet,UserNotificationsViewSet


router = DefaultRouter()
router.register(r'view', NotificationViewSet, basename="Notifications")
router.register(r'user', UserNotificationsViewSet, basename="User Notifications")


urlpatterns = [
    
] + router.urls
