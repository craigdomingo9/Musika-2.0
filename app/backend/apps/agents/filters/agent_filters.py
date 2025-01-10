import django_filters
from django.db.models import Q
from agents.models import (
    Agent,
)



class AgentFilter(django_filters.FilterSet):
    exclude_business_code = django_filters.CharFilter(method='filter_exclude_business_code')
    
    class Meta:
        model = Agent
        fields = ['exclude_business_code']
    
    def filter_exclude_business_code(self, queryset, name, value):
        if value:
            return queryset.exclude(
                Q(business_relationships__business__code=value) & 
                Q(business_relationships__status='active')
            ) 
        return queryset
