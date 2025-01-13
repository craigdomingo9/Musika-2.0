from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters import rest_framework as filters

from relationships.filters import AssignmentsFilter
from relationships.models import Assignment
from relationships.serializers import (
    AssignmentSerializer,
    AssignmentCreateSerializer
)

class AssignmentsViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AssignmentsFilter

    def get_serializer_class(self):
        if self.action in ['create', 'update']:
            return AssignmentCreateSerializer
        return AssignmentSerializer
      
    @action(detail=True, methods=['post'], url_path='deassign')
    def deassign(self, request, pk=None):
        try:
            application = self.get_object()
            application.deassign()
            return Response({'status': 'Assignment was deassigned.'}, status=status.HTTP_200_OK)
        except Assignment.DoesNotExist:
            return Response({'error': 'Assignment not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
