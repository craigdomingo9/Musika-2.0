from django.utils.deprecation import MiddlewareMixin
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.request import Request
from user_agents import parse  # Ensure this package is installed
from logging import getLogger
from rest_framework.authtoken.models import Token

from account.models import Account

logger = getLogger(__name__)



class AnonymousUserMiddleware(MiddlewareMixin):
    model = Account

    def process_request(self, request: Request) -> None:
        """
        Generates an account for anonymous users.
        """
        if not request.user.is_authenticated:
            self.create_anonymous_user(request)


    def create_anonymous_user(self, request: Request) -> None:
        """
        Creates an anonymous user and stores id in session.
        """
        uuid_header = request.headers.get('X-Uuid')
        
        if uuid_header is not None:
            try:
                user = self.model.objects.get(uuid=uuid_header)
                request.user = user
            except ObjectDoesNotExist as e:
                logger.error(f"Account was not found: {e}")

