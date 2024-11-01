import django_filters
from .models import Subscription


class SubscriptionFilter(django_filters.FilterSet):
    user_uuid = django_filters.UUIDFilter(field_name='user__uuid', lookup_expr='exact')
    
    class Meta:
        model = Subscription
        fields = ['user_uuid']