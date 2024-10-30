# middleware.py
from django.utils.deprecation import MiddlewareMixin
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.request import Request
from logging import getLogger
from .models import Account
from analytics.models import Acquisition

logger = getLogger(__name__)

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
            anonymous_user_id = request.session.get('user_uuid')
            if anonymous_user_id:
                request.user = self.model.objects.get(uuid=anonymous_user_id)
            else:
                request.user = self.model.objects.create_anonymous_user()
                request.session['user_uuid'] = str(request.user.uuid)

            # Create an Acquisition entry for the anonymous user
            self.record_acquisition(request)
        except ObjectDoesNotExist as e:
            logger.error(f"Account was not found: {e}")

    def record_acquisition(self, request: Request) -> None:
        """Records the acquisition of an anonymous user."""
        source = request.GET.get('source', 'organic')  # Default to 'organic' if no source is provided
        medium = request.GET.get('medium', '')
        referring_agent_code = request.GET.get('referrer', '')  # Assuming the referring agent's code comes in as 'referrer'

        Acquisition.objects.create(
            user=self.model.objects.get(uuid=request.user.uuid),
            source=source,
            medium=medium,
            referring_agent_code=referring_agent_code,
            device=request.META.get('HTTP_USER_AGENT', ''),  # Capture device information
            browser=request.META.get('HTTP_USER_AGENT', ''),  # You might want to parse this further to get browser info
            os=request.META.get('HTTP_USER_AGENT', ''),  # Same here for OS
        )