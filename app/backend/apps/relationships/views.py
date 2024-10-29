from rest_framework import viewsets,status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .permissions import IsBusinessOwner, IsAgentOrBusiness
from .models import BusinessAgentRelationship, AcceptedOffer, AgentApplication, BusinessOffer
from .serializers import (
    BusinessAgentRelationshipSerializer,
    BusinessAgentRelationshipCreateSerializer,
    AgentApplicationSerializer,
    AgentApplicationCreateSerializer,
    BusinessOfferSerializer,
    BusinessOfferCreateSerializer,
    AcceptedOfferSerializer, AcceptedOfferCreateSerializer
)

class BusinessAgentRelationshipViewSet(viewsets.ModelViewSet):
    queryset = BusinessAgentRelationship.objects.all()
    permission_classes = [IsAuthenticated, IsAgentOrBusiness]

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT']:
            return BusinessAgentRelationshipCreateSerializer
        return BusinessAgentRelationshipSerializer
    
    @action(detail=True, methods=['post'], url_path='revoke-relationship')
    def revoke_relationship(self, request, pk=None):
        try:
            application = self.get_object()
            application.revoke_relationship()
            return Response({'status': 'Relationship was revoked.'}, status=status.HTTP_200_OK)
        except BusinessAgentRelationship.DoesNotExist:
            return Response({'error': 'Relationship not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AgentApplicationViewSet(viewsets.ModelViewSet):
    queryset = AgentApplication.objects.all()
    permission_classes = [IsAuthenticated, IsBusinessOwner]

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT']:
            return AgentApplicationCreateSerializer
        return AgentApplicationSerializer
    
    @action(detail=True, methods=['post'], url_path='approve-application')
    def approve_application(self, request, pk=None):
        try:
            application = self.get_object()
            application.approve_application()  # Assuming this method updates the status
            return Response({'status': 'Application was approved'}, status=status.HTTP_200_OK)
        except AgentApplication.DoesNotExist:
            return Response({'error': 'Application not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['post'], url_path='reject-application')
    def reject_application(self, request, pk=None):
        try:
            application = self.get_object()
            application.reject_application()  # Assuming this method updates the status
            return Response({'status': 'Application was rejected'}, status=status.HTTP_200_OK)
        except AgentApplication.DoesNotExist:
            return Response({'error': 'Application not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BusinessOfferViewSet(viewsets.ModelViewSet):
    queryset = BusinessOffer.objects.all()
    permission_classes = [IsAuthenticated, IsAgentOrBusiness]

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT']:
            return BusinessOfferCreateSerializer
        return BusinessOfferSerializer

class AcceptedOfferViewSet(viewsets.ModelViewSet):
    queryset = AcceptedOffer.objects.all()
    permission_classes = [IsAuthenticated,IsAgentOrBusiness]

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