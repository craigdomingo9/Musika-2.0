import django_filters
from business.models import (
    Location,
)



class BusinessLocationFilter(django_filters.FilterSet):
    business = django_filters.CharFilter(field_name='business__code', lookup_expr='exact')
    
    class Meta:
        model = Location
        fields = ['business']
