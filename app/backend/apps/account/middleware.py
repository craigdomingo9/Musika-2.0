# middleware.py
from django.utils.deprecation import MiddlewareMixin
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.request import Request
from logging import getLogger

logger = getLogger(__name__)

from .models import Account

class AnonymousUserMiddleware(MiddlewareMixin):
    model = Account
    def process_request(self, request: Request) -> None:
        """
        Generates an account for anonymous users
        """
        # if user is an anonymous user
        if not request.user.is_authenticated:
            self.create_anonymous_user(request)

    def create_anonymous_user(self, request: Request) -> None:
        """Creates an anonymous user and stores id in session"""
        try:
            anonymous_user_id = request.session.get('anonymous_user_id')
            if anonymous_user_id:
                request.user = self.model.objects.get(uuid=anonymous_user_id)
            else:
                request.user = self.model.objects.create_anonymous_user()
                request.session['anonymous_user_id'] = str(request.user.uuid)
        except ObjectDoesNotExist as e:
            logger.error(f"Account was not found: {e}")
