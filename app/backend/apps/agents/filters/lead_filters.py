import django_filters

from agents.models import Lead


class LeadFilter(django_filters.FilterSet):
    code = django_filters.CharFilter(field_name='agent__code', lookup_expr='exact')
    
    class Meta:
        model = Lead
        fields = ['code']
        