import django_filters
from business.models import (
    Product,
)


class ProductFilter(django_filters.FilterSet):
    is_featured = django_filters.BooleanFilter(field_name='is_featured')
    on_sale = django_filters.BooleanFilter(field_name='variant__on_sale')
    business = django_filters.CharFilter(field_name='business__code', lookup_expr='exact')
    category = django_filters.CharFilter(field_name='category__name', lookup_expr='exact')
    catalog = django_filters.CharFilter(field_name='catalog__id', lookup_expr='exact')
    
    class Meta:
        model = Product
        fields = ['is_featured', 'on_sale', 'business', 'catalog']
