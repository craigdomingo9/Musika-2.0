import django_filters
from business.models import (
    ProductVariant
)



class ProductVariantFilter(django_filters.FilterSet):
    product = django_filters.CharFilter(field_name='product__id', lookup_expr='exact')
    
    class Meta:
        model = ProductVariant
        fields = ['product']
