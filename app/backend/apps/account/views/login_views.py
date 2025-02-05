from rest_framework.response import Response
from logging import getLogger
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from account.models import Account

logger = getLogger(__name__)



class LoginView(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        token,_ = Token.objects.get_or_create(user=user)
        
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'uuid': user.uuid,
        })
