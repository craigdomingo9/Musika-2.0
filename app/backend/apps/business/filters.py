import django_filters
from .models import (
    Product,
    Profile,
    Location,
    ProductReview,
    Catalog,
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


class ProductReviewFilter(django_filters.FilterSet):
    business = django_filters.CharFilter(field_name='product__business__code', lookup_expr='exact')
    product = django_filters.CharFilter(field_name='product__id', lookup_expr='exact')
    
    class Meta:
        model = ProductReview
        fields = ['business', 'product']


class BusinessProfileFilter(django_filters.FilterSet):
    user_uuid = django_filters.UUIDFilter(field_name='business__user__uuid', lookup_expr='exact')
    business = django_filters.CharFilter(field_name='business__code', lookup_expr='exact')
    
    class Meta:
        model = Profile
        fields = ['user_uuid', 'business']


class BusinessLocationFilter(django_filters.FilterSet):
    business = django_filters.CharFilter(field_name='business__code', lookup_expr='exact')
    
    class Meta:
        model = Location
        fields = ['business']


class CatalogFilter(django_filters.FilterSet):
    business = django_filters.CharFilter(field_name='business__code', lookup_expr='exact')
    
    class Meta:
        model = Catalog
        fields = ['business']