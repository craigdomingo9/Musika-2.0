import django_filters

from relationships.models import Assignment


class AssignmentsFilter(django_filters.FilterSet):
    agent_code = django_filters.CharFilter(field_name='agent__code', lookup_expr='exact')
    business_code = django_filters.CharFilter(field_name='product__business__code', lookup_expr='exact')
    status = django_filters.CharFilter(field_name='status', lookup_expr='exact')
    
    class Meta:
        model = Assignment
        fields = ['agent_code', 'business_code', 'status']
        