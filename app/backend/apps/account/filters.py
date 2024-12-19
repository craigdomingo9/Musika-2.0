import django_filters
from .models import (
    Account,
    AccountPreferences,
)


class AccountPreferencesFilter(django_filters.FilterSet):
    user_uuid = django_filters.UUIDFilter(field_name='user__uuid', lookup_expr='exact')
    
    class Meta:
        model = AccountPreferences
        fields = ['user_uuid']
        
class AccountFilter(django_filters.FilterSet):
    user_uuid = django_filters.UUIDFilter(field_name='uuid', lookup_expr='exact')
    is_admin = django_filters.BooleanFilter(field_name='is_admin')
    
    class Meta:
        model = Account
        fields = ['user_uuid', 'is_admin']