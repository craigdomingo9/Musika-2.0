from rest_framework import viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from logging import getLogger
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from django.contrib.auth import login,logout,authenticate
from rest_framework.permissions import IsAuthenticated,AllowAny
from django_filters import rest_framework as filters

logger = getLogger(__name__)

from .serializers import AccountSerializer, AccountCreateSerializer, AccountPreferencesSerializer
from account.utils.account_updater import AccountUpdater
from .serializers import PasswordChangeSerializer
from .models import AccountPreferences
from .filters import AccountPreferencesFilter, AccountFilter
from middleware.permissions import IsAccountOwner

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
    
    
    def create(self, request: Request) -> Response:

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

            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_400_BAD_REQUEST)

class AccountPreferencesViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAccountOwner]
    queryset = AccountPreferences.objects.all()
    serializer_class = AccountPreferencesSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AccountPreferencesFilter
    

class PasswordChangeView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = PasswordChangeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request: Request) -> Response:
        username = request.data['username']
        password = request.data['password']
        
        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            request.session['user_uuid'] = str(user.uuid)
            return Response({'user_uuid': request.session['user_uuid'], 'message':"Logged in successfully."}, status=status.HTTP_200_OK)
        else:
            logger.warning(f"Invalid login attempt for username: {username}")
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request: Request) -> Response:
        logout(request)
        request.session.flush()
        return Response(status=status.HTTP_200_OK)
