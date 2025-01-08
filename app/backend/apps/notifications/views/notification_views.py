from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated,AllowAny
from django_filters import rest_framework as filters
from rest_framework.response import Response

from notifications.serializers import NotificationSerializer
from notifications.models import Notification
from notifications.filters import NotificationFilter


class NotificationViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = NotificationFilter
    
    @action(detail=True, methods=['post'], url_path='mark-as-read')
    def mark_as_read(self, request, pk=None, **kwargs):
        try:
            notification = self.get_object()  # Fetch the notification by primary key
            notification.mark_as_read()  # Call the method to mark it as read
            return Response({'status': 'Notification marked as read'}, status=status.HTTP_200_OK)
        except Notification.DoesNotExist:
            return Response({'error': 'Notification not found'}, status=status.HTTP_404_NOT_FOUND)

    