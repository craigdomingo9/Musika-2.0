from rest_framework import viewsets,status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters

from middleware.permissions import IsBusinessOwner, IsAgentOrBusiness
from relationships.filters import AgentApplicationFilter
from relationships.models import AgentApplication
from relationships.serializers import (
    AgentApplicationSerializer,
    AgentApplicationCreateSerializer
)


class AgentApplicationViewSet(viewsets.ModelViewSet):
    queryset = AgentApplication.objects.all()
    permission_classes = [IsAuthenticated, IsBusinessOwner]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AgentApplicationFilter

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
