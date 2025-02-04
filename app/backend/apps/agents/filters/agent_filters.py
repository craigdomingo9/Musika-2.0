import django_filters
from django.db.models import Q, Subquery
from agents.models import (
    Agent,
)
from relationships.models import (
    BusinessAgentRelationship, 
    BusinessOffer
)


class AgentFilter(django_filters.FilterSet):
    exclude_related_agents = django_filters.CharFilter(method='filter_related_agents')
    
    class Meta:
        model = Agent
        fields = ['exclude_related_agents']
    
    def filter_related_agents(self, queryset, name, value):
        """
        Filters the queryset to exclude agents related to the given business code.

        Args:
            queryset: The queryset to filter.
            name: The name of the filter (not used in this implementation).
            value: The business code to exclude.

        Returns:
            The filtered queryset.
        """
        if value:
            return queryset.exclude(
                Q(id__in=Subquery(
                    BusinessAgentRelationship.objects.filter(
                        business__code=value, 
                        status='active'
                    ).values_list('agent_id', flat=True)
                ))
            )
        
        return queryset
