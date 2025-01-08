from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

from agents.models  import Agent
from notifications.models import Notification

User = get_user_model()



def create_notification(user, message):
    # Create a notification for the specified user
    Notification.objects.create(user=user, message=message)

@receiver(post_save, sender=Agent)
def create_agent_profile(sender, instance, created, **kwargs):
    if created:
        message = f"New agent created: {instance.full_name()}"
        # Notify admin or other relevant users
        for admin in User.objects.filter(is_admin=True):
            create_notification(admin, message)
