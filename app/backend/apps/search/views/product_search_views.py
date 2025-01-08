from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from search.search import search_products
from business.serializers import ProductSerializer



class ProductSearchView(APIView):
    permission_classes = [AllowAny,]
    
    
    def get(self, request, **kwargs):
        query = kwargs['query']
        # user = request.user
        
        results = []

        if query:
            results = search_products(query)
            
        # Save the search results
        # search_result = SearchResults.objects.create(
        #     query=query,
        #     user=user,
        #     product_ids=[result.id for result in results],  # Assuming results is a list of dicts
        #     total_results=len(results)
        # )
        
        context = {'request': self.request}
        
        serializer = ProductSerializer(results, many=True, context=context)
        

        return Response(serializer.data, status=status.HTTP_200_OK)
