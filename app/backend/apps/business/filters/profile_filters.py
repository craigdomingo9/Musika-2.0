import django_filters
from business.models import (
    Profile,
)


class BusinessProfileFilter(django_filters.FilterSet):
    user_uuid = django_filters.UUIDFilter(field_name='business__user__uuid', lookup_expr='exact')
    business = django_filters.CharFilter(field_name='business__code', lookup_expr='exact')
    
    class Meta:
        model = Profile
        fields = ['user_uuid', 'business']

