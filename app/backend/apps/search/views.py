from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .search import search_products
from .models import SearchResults
from .serializers import SearchResultsSerializer


class ProductSearchView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, **kwargs):
        query = kwargs['query']
        user = request.user
        
        results = []

        if query:
            results = search_products(query)

        # Save the search results
        search_result = SearchResults.objects.create(
            query=query,
            user=user,
            product_ids=[result['id'] for result in results],  # Assuming results is a list of dicts
            total_results=len(results)
        )
        

        return Response(results, status=status.HTTP_200_OK)


class SearchHistoryViewSet(viewsets.ModelViewSet):
    queryset = SearchResults.objects.all().order_by('-created_at')  # Order by creation time
    serializer_class = SearchResultsSerializer

    def perform_create(self, serializer):
        # Automatically set the user when creating a new search history entry
        serializer.save(user=self.request.user)