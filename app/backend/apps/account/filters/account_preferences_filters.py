import django_filters

from account.models import AccountPreferences


class AccountPreferencesFilter(django_filters.FilterSet):
    user_uuid = django_filters.UUIDFilter(field_name='user__uuid', lookup_expr='exact')
    
    class Meta:
        model = AccountPreferences
        fields = ['user_uuid']
        