import django_filters
from .models import (
    Order,
    status_choices
)


class OrderFilter(django_filters.FilterSet):
    business = django_filters.CharFilter(field_name='product__product__business__code', lookup_expr='exact')
    agent = django_filters.CharFilter(field_name='agent__code', lookup_expr='exact')
    status = django_filters.ChoiceFilter(choices=status_choices,field_name='status', lookup_expr='exact')
    
    class Meta:
        model = Order
        fields = ['business', 'agent', 'status']
