import django_filters
from .models import SearchResults

class SearchResultsFilter(django_filters.FilterSet):
    user_uuid = django_filters.UUIDFilter(field_name='user__uuid', lookup_expr='exact')
    
    class Meta:
        model = SearchResults
        fields = ['user_uuid']
