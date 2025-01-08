from rest_framework import viewsets
from django_filters import rest_framework as filters

from rest_framework.permissions import AllowAny, IsAuthenticated
from search.models import SearchResults
from search.serializers import SearchResultsSerializer
from search.filters import SearchResultsFilter



class SearchHistoryViewSet(viewsets.ModelViewSet):
    queryset = SearchResults.objects.all().order_by('-created_at')  # Order by creation time
    serializer_class = SearchResultsSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = SearchResultsFilter
    
    
    def perform_create(self, serializer):
        # Automatically set the user when creating a new search history entry
        serializer.save(user=self.request.user)

