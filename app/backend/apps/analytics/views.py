from rest_framework import viewsets
from .models import Acquisition, Interaction, ProductAnalytics, AgentAnalytics, BusinessAnalytics
from .serializers import (
    AcquisitionSerializer,
    InteractionSerializer,
    ProductAnalyticsSerializer,
    AgentAnalyticsSerializer,
    BusinessAnalyticsSerializer,
)

class AcquisitionViewSet(viewsets.ModelViewSet):
    queryset = Acquisition.objects.all()
    serializer_class = AcquisitionSerializer


class InteractionViewSet(viewsets.ModelViewSet):
    queryset = Interaction.objects.all()
    serializer_class = InteractionSerializer


class ProductAnalyticsViewSet(viewsets.ModelViewSet):
    queryset = ProductAnalytics.objects.all()
    serializer_class = ProductAnalyticsSerializer


class AgentAnalyticsViewSet(viewsets.ModelViewSet):
    queryset = AgentAnalytics.objects.all()
    serializer_class = AgentAnalyticsSerializer


class BusinessAnalyticsViewSet(viewsets.ModelViewSet):
    queryset = BusinessAnalytics.objects.all()
    serializer_class = BusinessAnalyticsSerializer

