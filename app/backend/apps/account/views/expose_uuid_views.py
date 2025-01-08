from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from logging import getLogger
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny

from account.models import Account

logger = getLogger(__name__)



class ExposeUuid(APIView):
    permission_classes = [AllowAny,]
    
    def get(self, request: Request) -> Response:
        uuid_header = request.headers.get('X-Uuid')
        print(uuid_header)

        if uuid_header is None:
            try:
                new_user = Account.objects.create_anonymous_user()
                ### TODO: Record Acquisition
                return Response(data={"uuid": new_user.uuid}, status=status.HTTP_200_OK)
            except Exception as e:
                # Log the error and return an appropriate error response
                logger.error(f"Error creating anonymous user: {str(e)}")
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(status=status.HTTP_200_OK)