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
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    class Meta:
        model = Business
        fields = ['id', 'user', 'code', 'created_at', 'updated_at', 'profile']
        read_only_fields = ['code']
        depth = 1


