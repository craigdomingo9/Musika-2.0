import django_filters 

from relationships.models import BusinessOffer


class BusinessOfferFilter(django_filters.FilterSet):
    business = django_filters.CharFilter(field_name="business__code", lookup_expr='exact')
    agent = django_filters.CharFilter(field_name="agent__code", lookup_expr='exact')
    status = django_filters.CharFilter(field_name="status", lookup_expr='exact')

    class Meta:
        model = BusinessOffer
        fields = ['business', 'agent']
