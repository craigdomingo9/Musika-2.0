from rest_framework.response import Response
from rest_framework import status
from logging import getLogger
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny

from account.serializers import PasswordChangeSerializer

logger = getLogger(__name__)




class PasswordChangeView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = PasswordChangeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

