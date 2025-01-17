from rest_framework import viewsets
from django_filters import rest_framework as filters
from rest_framework.permissions import AllowAny

from business.filters import (
    BusinessProfileFilter,
)
from business.models import (
    Profile,
)
from business.serializers import (
    ProfileSerializer,
    ProfileCreateSerializer,
)



class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny,]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = BusinessProfileFilter
    
    def get_serializer_context(self):
        return {'request': self.request}
    
    def get_serializer_class(self):
        if self.action in ["create", "update"]:
            self.serializer_class = ProfileCreateSerializer
        return super().get_serializer_class()
    
    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)

