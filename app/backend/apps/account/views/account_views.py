from rest_framework import viewsets
from rest_framework import status
from django.db import transaction
from logging import getLogger
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated,AllowAny
from django_filters import rest_framework as filters

    
from account.serializers import AccountSerializer, AccountCreateSerializer
from account.filters import AccountFilter

logger = getLogger(__name__)




# views.py
class AccountViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = get_user_model().objects.all()
    serializer_class = AccountSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AccountFilter
    
    
    def get_serializer_class(self):
        if self.action in ["create", "update"]:
            self.serializer_class = AccountCreateSerializer
        return super().get_serializer_class()
    
    def get_serializer_context(self):
        return {'request': self.request}
    
    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)
        

    # def create(self, request: Request) -> Response:

    #     data = dict(request.data.copy())
    #     del data["csrfmiddlewaretoken"]
        
    #     anonymous_user_uuid = request.session.get('anonymous_user_id')
        
    #     try:
    #         with transaction.atomic():
    #             anonymous_user, _ = get_user_model().objects.get_or_create(uuid=anonymous_user_uuid)
    #             anonymous_user.is_anonymous = False
    #             account_updater = AccountUpdater(anonymous_user, data)
    #             updated_user = account_updater.call()
    #             updated_user.save(update_fields=account_updater.update_fields)
    #             serializer = self.serializer_class(updated_user, data=data)
    #             return Response(serializer.initial_data, status=status.HTTP_201_CREATED)
    #     except Exception as e:
    #         # Handle exception
    #         logger.error(f"Account creation failed: {e}")

    #         return Response({"error": "An unexpected error occurred."}, status=status.HTTP_400_BAD_REQUEST)
    
