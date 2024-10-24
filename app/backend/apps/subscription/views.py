from rest_framework import viewsets


from .models import Subscription, Plan, Feature, SubscriptionPayment
from .serializers import SubscriptionSerializer, PlanSerializer, FeatureSerializer, SubscriptionPaymentSerializer

class FeatureViewSet(viewsets.ModelViewSet):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer

class PlanViewSet(viewsets.ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

class SubscriptionPaymentViewSet(viewsets.ModelViewSet):
    queryset = SubscriptionPayment.objects.all()
    serializer_class = SubscriptionPaymentSerializer