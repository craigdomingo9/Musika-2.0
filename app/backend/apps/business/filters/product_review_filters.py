import django_filters
from business.models import (
  ProductReview,
)


class ProductReviewFilter(django_filters.FilterSet):
    business = django_filters.CharFilter(field_name='product__business__code', lookup_expr='exact')
    product = django_filters.CharFilter(field_name='product__id', lookup_expr='exact')
    
    class Meta:
        model = ProductReview
        fields = ['business', 'product']
        