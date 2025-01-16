from django.contrib.auth import get_user_model
from rest_framework import serializers

from .profile_serializers import (
  ProfileSerializer
)
from business.models import (
    Business
)

User = get_user_model()


class BusinessSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    
    class Meta:
        model = Business
        fields = ['id', 'user', 'code', 'created_at', 'updated_at', 'profile']
        depth = 1

class BusinessCreateSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    class Meta(BusinessSerializer.Meta):
        fields = ['user']

