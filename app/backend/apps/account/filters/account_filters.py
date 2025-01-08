import django_filters

from account.models import Account


    
class AccountFilter(django_filters.FilterSet):
    user_uuid = django_filters.UUIDFilter(field_name='uuid', lookup_expr='exact')
    is_admin = django_filters.BooleanFilter(field_name='is_admin')
    
    class Meta:
        model = Account
        fields = ['user_uuid', 'is_admin']