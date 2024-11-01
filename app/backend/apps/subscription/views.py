from rest_framework import viewsets
from django_filters import rest_framework as filters
from .models import Subscription, Plan, Feature, SubscriptionPayment
from .serializers import SubscriptionSerializer, PlanSerializer, FeatureSerializer, SubscriptionPaymentSerializer
from .filters import SubscriptionFilter


class FeatureViewSet(viewsets.ModelViewSet):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer

class PlanViewSet(viewsets.ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = SubscriptionFilter
    

class SubscriptionPaymentViewSet(viewsets.ModelViewSet):
    queryset = SubscriptionPayment.objects.all()
    serializer_class = SubscriptionPaymentSerializer