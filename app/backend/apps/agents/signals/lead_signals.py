from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

from agents.models import Lead
from notifications.models import Notification

User = get_user_model()




def create_notification(user, message):
    # Create a notification for the specified user
    Notification.objects.create(user=user, message=message)


@receiver(post_save, sender=Lead)
def lead_created(sender, instance, created, **kwargs):
    if created:
        message = f"New lead created: {instance.product.name} - {instance.source.name}"
        # Notify the agent associated with the lead
        create_notification(instance.agent.user, message)  # Notify the agent
        # Optionally notify the sales team or admin
        for admin in User.objects.filter(is_admin=True):
            create_notification(admin, message)
