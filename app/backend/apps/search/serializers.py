from rest_framework import serializers
from .models import SearchResults

class SearchResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchResults
        fields = '__all__'  # Include fields you want to serialize
        read_only_fields = ['user', 'created_at']  # User and created_at should be read-only