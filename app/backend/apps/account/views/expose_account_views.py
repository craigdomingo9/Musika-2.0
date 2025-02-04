from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from logging import getLogger
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from account.models import Account
from account.serializers import AccountSerializer

logger = getLogger(__name__)


class ExposeAccount(APIView):
    permission_classes = [AllowAny,]
    
    def get_serializer_context(self):
        return {'request': self.request}
    
    def get(self, request: Request) -> Response:
        uuid_header = request.headers.get('X-Uuid')
        # print(uuid_header)  # For debugging

        if uuid_header is None:
            try:
                new_user = Account.objects.create_anonymous_user()
                serializer = AccountSerializer(new_user) 
                return Response(data=serializer.data, status=status.HTTP_201_CREATED) 
            except Exception as e:
                logger.error(f"Error creating anonymous user: {str(e)}")
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            user = Account.objects.get(uuid=uuid_header)
            serializer = AccountSerializer(user, context=self.get_serializer_context())
            return Response(data=serializer.data, status=status.HTTP_200_OK) 
        except Account.DoesNotExist:
            logger.error(f"User with UUID {uuid_header} not found.")
            return Response(status=status.HTTP_404_NOT_FOUND) 
        except Exception as e:
            logger.error(f"Error retrieving user: {str(e)}")
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

