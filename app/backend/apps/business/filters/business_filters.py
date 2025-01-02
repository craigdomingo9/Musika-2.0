import django_filters
from business.models import (
    Business,
)


class BusinessFilter(django_filters.FilterSet):
    uuid = django_filters.UUIDFilter(field_name='profile__business__user__uuid', lookup_expr='exact')
    
    class Meta:
        model = Business
        fields = ['uuid']