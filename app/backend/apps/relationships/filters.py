import django_filters 
from .models import (
    BusinessAgentRelationship,
    AgentApplication,
    BusinessOffer,
    AcceptedOffer
)



class BusinessAgentRelationshipFilter(django_filters.FilterSet):
    business = django_filters.CharFilter(field_name="business__code", lookup_expr='exact')
    agent = django_filters.CharFilter(field_name="agent__code", lookup_expr='exact')

    class Meta:
        model = BusinessAgentRelationship
        fields = ['business', 'agent']


class AgentApplicationFilter(django_filters.FilterSet):
    business = django_filters.CharFilter(field_name="business__code", lookup_expr='exact')
    agent = django_filters.CharFilter(field_name="agent__code", lookup_expr='exact')

    class Meta:
        model = AgentApplication
        fields = ['business', 'agent']


class BusinessOfferFilter(django_filters.FilterSet):
    business = django_filters.CharFilter(field_name="business__code", lookup_expr='exact')
    agent = django_filters.CharFilter(field_name="agent__code", lookup_expr='exact')

    class Meta:
        model = BusinessOffer
        fields = ['business', 'agent']

class AcceptedOfferFilter(django_filters.FilterSet):
    business = django_filters.CharFilter(field_name="business_offer__business__code", lookup_expr='exact')
    agent = django_filters.CharFilter(field_name="agent__code", lookup_expr='exact')

    class Meta:
        model = AcceptedOffer
        fields = ['business', 'agent']
