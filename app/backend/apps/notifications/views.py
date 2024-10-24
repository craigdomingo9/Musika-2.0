from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated,AllowAny


from .serializers import NotificationSerializer
from .models import Notification



class NotificationViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    
class UserNotificationsViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    lookup_field = "user"
    
    