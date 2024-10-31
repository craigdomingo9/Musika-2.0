from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from django.contrib.postgres.search import TrigramSimilarity
from business.models import Product
from business.serializers import ProductSerializer



def search_products(query):
    # Define the fields you want to search
    vector = SearchVector('name', 'description')
    search_query = SearchQuery(query)

    # Perform fuzzy search
    results = Product.objects.annotate(
        similarity=TrigramSimilarity('name', query) + 
                   TrigramSimilarity('description', query),
        rank=SearchRank(vector, search_query)
    ).filter(similarity__gt=0.1).order_by('-similarity')  # Adjust threshold as needed
    

    return ProductSerializer(results, many=True).data