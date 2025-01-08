from rest_framework import viewsets,status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters

from middleware.permissions import IsBusinessOwner, IsAgentOrBusiness
from relationships.filters import AcceptedOfferFilter
from relationships.models import AcceptedOffer
from relationships.serializers import (
    AcceptedOfferSerializer, 
    AcceptedOfferCreateSerializer
)


class AcceptedOfferViewSet(viewsets.ModelViewSet):
    queryset = AcceptedOffer.objects.all()
    permission_classes = [IsAuthenticated,IsAgentOrBusiness]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AcceptedOfferFilter

    def get_serializer_class(self):
        if self.action == 'create':
            return AcceptedOfferCreateSerializer
        return AcceptedOfferSerializer
    
    @action(detail=True, methods=['post'], url_path='revoke-accepted-offer')
    def revoke_accepted_offer(self, request, pk=None):
        try:
            application = self.get_object()
            application.revoke_accepted_offer()
            return Response({'status': 'Offer was revoked.'}, status=status.HTTP_200_OK)
        except AcceptedOffer.DoesNotExist:
            return Response({'error': 'Offer not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)