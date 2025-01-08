from rest_framework import viewsets,status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters

from middleware.permissions import IsBusinessOwner, IsAgentOrBusiness
from relationships.filters import BusinessAgentRelationshipFilter
from relationships.models import BusinessAgentRelationship
from relationships.serializers import (
    BusinessAgentRelationshipSerializer,
    BusinessAgentRelationshipCreateSerializer
)



class BusinessAgentRelationshipViewSet(viewsets.ModelViewSet):
    queryset = BusinessAgentRelationship.objects.all()
    permission_classes = [IsAuthenticated, IsAgentOrBusiness]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = BusinessAgentRelationshipFilter

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT']:
            return BusinessAgentRelationshipCreateSerializer
        return BusinessAgentRelationshipSerializer
    
    def get_serializer_context(self):
        return {'request': self.request}
    
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
