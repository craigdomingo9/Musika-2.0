import django_filters

from agents.models import AgentProfile


class AgentProfileFilter(django_filters.FilterSet):
    user_uuid = django_filters.UUIDFilter(field_name='agent__user__uuid', lookup_expr='exact')
    code = django_filters.CharFilter(field_name='agent__code', lookup_expr='exact')
    
    class Meta:
        model = AgentProfile
        fields = ['user_uuid', 'code']
        