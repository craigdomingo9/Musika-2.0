from rest_framework import viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from typing import Any
from django.db import transaction
from logging import getLogger
from django.contrib.auth import get_user_model
from rest_framework.views import APIView

logger = getLogger(__name__)

from .serializers import AccountSerializer, AccountCreateSerializer
from account.utils.account_updater import AccountUpdater
from .serializers import PasswordChangeSerializer


# views.py
class AccountViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = AccountSerializer
    
    def get_serializer_class(self):
        if self.action in ["create", "update"]:
            self.serializer_class = AccountCreateSerializer
        return super().get_serializer_class()
    
    
    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:

        data = dict(request.data.copy())
        del data["csrfmiddlewaretoken"]
        
        anonymous_user_uuid = request.session.get('anonymous_user_id')
        
        try:
            with transaction.atomic():
                anonymous_user, _ = get_user_model().objects.get_or_create(uuid=anonymous_user_uuid)
                anonymous_user.is_anonymous = False
                account_updater = AccountUpdater(anonymous_user, data)
                updated_user = account_updater.call()
                updated_user.save(update_fields=account_updater.update_fields)
                serializer = self.serializer_class(updated_user, data=data)
                return Response(serializer.initial_data, status=status.HTTP_201_CREATED)
        except Exception as e:
            # Handle exception
            logger.error(f"Account creation failed: {e}")

            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class PasswordChangeView(APIView):
    def post(self, request):
        serializer = PasswordChangeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
