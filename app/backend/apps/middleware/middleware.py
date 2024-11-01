# middleware.py
from django.utils.deprecation import MiddlewareMixin
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.request import Request
from user_agents import parse  # Ensure this package is installed
from logging import getLogger
from account.models import Account
from analytics.models import Acquisition
from business.models import Product
from agents.models import Lead, LeadSource, Agent

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
        referring_agent_code = request.GET.get('referrer', '')  # Referring agent's code
        product_id = request.GET.get('product_id')  # Assuming product_id is passed in the URL
        lead_source_name = request.GET.get('lead_source')  # Assuming lead source name is passed in the URL

        # Get the user from the request
        user = self.model.objects.get(uuid=request.user.uuid)

        # Capture user agent
        user_agent_string = request.META.get('HTTP_USER_AGENT', '')
        user_agent = parse(user_agent_string)

        # Create the Acquisition object
        Acquisition.objects.create(
            user=user,
            source=source,
            medium=medium,
            referring_agent_code=referring_agent_code,
            device=user_agent.device.family,
            browser=user_agent.browser.family,
            os=user_agent.os.family
        )

        # Check if referring agent code is provided
        if referring_agent_code:
            # Get the agent associated with the referring agent code
            try:
                agent = Agent.objects.get(referral_code=referring_agent_code)  # Adjust field name as needed
            except Agent.DoesNotExist:
                agent = None

            # Get or create the lead source
            lead_source, created = LeadSource.objects.get_or_create(name=lead_source_name)

            # Get the product if product_id is provided
            product = None
            if product_id:
                try:
                    product = Product.objects.get(id=product_id)
                except Product.DoesNotExist:
                    product = None

            # Create a lead if the agent is found
            if agent:
                Lead.objects.create(
                    agent=agent,
                    source=lead_source,
                    user=user,
                    product=product,
                    status='new'
                )