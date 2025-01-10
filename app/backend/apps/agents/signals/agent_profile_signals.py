from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

from agents.models import AgentProfile
from notifications.models import Notification

User = get_user_model()




def create_notification(user, message):
    # Create a notification for the specified user
    Notification.objects.create(user=user, message=message)

@receiver(post_save, sender=AgentProfile)
def agent_profile_created(sender, instance, created, **kwargs):
    if created:
        message = (
            f"Congratulations, '{instance.agent.first_name}'  has been created.\n"
            f"Your business profile has been registered successfully.\n"
            f"Your business profile is now visible on the platform.\n"
            f"You can review our Guides section to understand the workflow of the platform."
            f"Best regards,\n"
            f"Musika Inc."
        )
        create_notification(instance.agent.user, message)  # Notify the agent
