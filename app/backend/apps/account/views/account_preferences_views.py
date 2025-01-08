from rest_framework import viewsets
from logging import getLogger
from rest_framework.permissions import IsAuthenticated,AllowAny
from django_filters import rest_framework as filters


from account.serializers import AccountPreferencesSerializer
from account.models import AccountPreferences
from account.filters import AccountPreferencesFilter
from middleware.permissions import IsAccountOwner

logger = getLogger(__name__)





class AccountPreferencesViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAccountOwner]
    queryset = AccountPreferences.objects.all()
    serializer_class = AccountPreferencesSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AccountPreferencesFilter
