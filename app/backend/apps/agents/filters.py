import django_filters
from .models import (
    AgentProfile,
    Preferences,
    AssignedProduct,
    Lead
)

class AgentProfileFilter(django_filters.FilterSet):
    user_uuid = django_filters.UUIDFilter(field_name='agent__user__uuid', lookup_expr='exact')
    code = django_filters.CharFilter(field_name='agent__code', lookup_expr='exact')
    
    class Meta:
        model = AgentProfile
        fields = ['user_uuid', 'code']
        
class AgentPreferencesFilter(django_filters.FilterSet):
    user_uuid = django_filters.UUIDFilter(field_name='agent__user__uuid', lookup_expr='exact')
    code = django_filters.CharFilter(field_name='agent__code', lookup_expr='exact')
    
    class Meta:
        model = Preferences
        fields = ['user_uuid', 'code']
        
class AssignedProductsFilter(django_filters.FilterSet):
    code = django_filters.CharFilter(field_name='agent__code', lookup_expr='exact')
    
    class Meta:
        model = AssignedProduct
        fields = ['code']
        
class LeadFilter(django_filters.FilterSet):
    code = django_filters.CharFilter(field_name='agent__code', lookup_expr='exact')
    
    class Meta:
        model = Lead
        fields = ['code']
        