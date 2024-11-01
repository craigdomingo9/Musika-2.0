import django_filters
from .models import Notification

class NotificationFilter(django_filters.FilterSet):
    user_uuid = django_filters.UUIDFilter(field_name='user__uuid', lookup_expr='exact')
    
    class Meta:
        model = Notification
        fields = ['user_uuid']
