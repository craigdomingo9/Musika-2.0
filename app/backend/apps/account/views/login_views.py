from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from logging import getLogger
from rest_framework.views import APIView
from django.contrib.auth import login,authenticate
from rest_framework.permissions import AllowAny

from account.models import Account

logger = getLogger(__name__)



class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request: Request) -> Response:
        username = request.data['username']
        password = request.data['password']
        
        if not username or not password:
            return Response({'error': 'username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            request.session['user_uuid'] = str(user.uuid)
            return Response({'user_uuid': request.session['user_uuid'], 'message':"Logged in successfully."}, status=status.HTTP_200_OK)
        else:
            logger.warning(f"Invalid login attempt for username: {username}")
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
