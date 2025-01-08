import django_filters 

from relationships.models import AcceptedOffer


class AcceptedOfferFilter(django_filters.FilterSet):
    business = django_filters.CharFilter(field_name="business_offer__business__code", lookup_expr='exact')
    agent = django_filters.CharFilter(field_name="agent__code", lookup_expr='exact')

    class Meta:
        model = AcceptedOffer
        fields = ['business', 'agent']
