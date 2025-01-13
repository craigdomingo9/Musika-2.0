from django.db.models import Q, Subquery
import django_filters

from business.models import Product
from relationships.models import Assignment

class ProductFilter(django_filters.FilterSet):
    is_featured = django_filters.BooleanFilter(field_name='is_featured')
    on_sale = django_filters.BooleanFilter(field_name='variant__on_sale')
    business = django_filters.CharFilter(field_name='business__code', lookup_expr='exact')
    category = django_filters.CharFilter(field_name='category__name', lookup_expr='exact')
    catalog = django_filters.CharFilter(field_name='catalog__id', lookup_expr='exact')
    exclude_agent_assigned = django_filters.CharFilter(method='filter_exclude_agent_code')
    
    class Meta:
        model = Product
        fields = ['is_featured', 'on_sale', 'business', 'catalog', 'exclude_agent_assigned']
    
    def filter_exclude_agent_code(self, queryset, name, value):
        if value:
            queryset = queryset.exclude(
            id__in=Subquery(
                Assignment.objects.filter(agent__code=value, status='active').values('product_id')
            ))
        return queryset
