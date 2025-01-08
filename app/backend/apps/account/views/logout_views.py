from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from logging import getLogger
from rest_framework.views import APIView
from django.contrib.auth import logout
from rest_framework.permissions import IsAuthenticated,AllowAny


logger = getLogger(__name__)



class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request: Request) -> Response:
        logout(request)
        request.session.flush()
        return Response(status=status.HTTP_200_OK)

