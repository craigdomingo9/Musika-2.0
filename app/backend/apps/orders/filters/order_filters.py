import django_filters

from orders.models import (
    Order,
)


class OrderFilter(django_filters.FilterSet):
    business = django_filters.CharFilter(field_name='product__product__business__code', lookup_expr='exact')
    customer = django_filters.CharFilter(field_name='customer__uuid', lookup_expr='exact')
    agent = django_filters.CharFilter(field_name='agent__code', lookup_expr='exact')
    status = django_filters.ChoiceFilter(choices=Order.STATUS_CHOICES, field_name='status')
    
    class Meta:
        model = Order
        fields = ['business', 'customer', 'agent', 'status']
