import django_filters

from notifications.models import Notification



class NotificationFilter(django_filters.FilterSet):
    user_uuid = django_filters.UUIDFilter(field_name='user__uuid', lookup_expr='exact')
    is_read = django_filters.BooleanFilter(field_name='is_read')
    
    class Meta:
        model = Notification
        fields = ['user_uuid', 'is_read']
