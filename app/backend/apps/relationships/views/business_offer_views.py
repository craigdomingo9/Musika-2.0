from rest_framework import viewsets,status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters

from middleware.permissions import IsBusinessOwner, IsAgentOrBusiness
from relationships.filters import BusinessOfferFilter
from relationships.models import BusinessOffer
from relationships.serializers import (
    BusinessOfferSerializer,
    BusinessOfferCreateSerializer
)


class BusinessOfferViewSet(viewsets.ModelViewSet):
    queryset = BusinessOffer.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = BusinessOfferFilter

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT']:
            return BusinessOfferCreateSerializer
        return BusinessOfferSerializer
    
    @action(detail=True, methods=['post'], url_path='cancel-offer')
    def cancel_offer(self, request, pk=None):
        try:
            application = self.get_object()
            application.cancel_offer()
            return Response({'status': 'Offer was cancelled.'}, status=status.HTTP_200_OK)
        except BusinessOffer.DoesNotExist:
            return Response({'error': 'Offer not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
