# middleware.py
from django.utils.deprecation import MiddlewareMixin
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.request import Request
from user_agents import parse  # Ensure this package is installed
from logging import getLogger
from account.models import Account

logger = getLogger(__name__)


class SessionMiddleware(MiddlewareMixin):
    model = Account
    
    def process_request(self, request: Request) -> None:
      """
        Gets the uuid from the request and assigns the related user account to the session.
        This functionality is for anonymous users.
      """
      try: 
        
        if 'HTTP_X_UUID' in request.META:
            uuid = request.META['HTTP_X_UUID']

            del request.META['HTTP_X_UUID']

            try:
                user = self.model.objects.get(uuid=uuid)
            except ObjectDoesNotExist as e:
                logger.error(f"Account was not found: {e}")
            
            if user:
                request.session.user = user
                request.user = user
          
      except Exception as e:
          logger.error(f"{e}")
        



class AnonymousUserMiddleware(MiddlewareMixin):
    model = Account

    def process_request(self, request: Request) -> None:
        """
        Generates an account for anonymous users and records their acquisition.
        """
        if not request.user.is_authenticated:
            self.create_anonymous_user(request)

    def create_anonymous_user(self, request: Request) -> None:
        """Creates an anonymous user and stores id in session."""
        try:
            uuid_header = request.headers.get('X-Uuid')
            
            if uuid_header is not (None or ""):
                request.user = self.model.objects.get(uuid=uuid_header)

        except ObjectDoesNotExist as e:
            logger.error(f"Account was not found: {e}")
