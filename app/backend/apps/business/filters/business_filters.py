import django_filters
from django.db.models import Q

from business.models import Business


class BusinessFilter(django_filters.FilterSet):
    uuid = django_filters.UUIDFilter(field_name='user__uuid', lookup_expr='exact')
    exclude_agent_code = django_filters.CharFilter(method='filter_exclude_agent_code')
    
    class Meta:
        model = Business
        fields = ['uuid', 'exclude_agent_code']
    
    def filter_exclude_agent_code(self, queryset, name, value):
        if value:
            return queryset.exclude(
                Q(agent_relationships__agent__code=value) & 
                Q(agent_relationships__status='active')
            ) 
        return queryset
