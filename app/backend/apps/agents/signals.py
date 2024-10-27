from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Agent, AgentProfile, Preferences, Lead, AssignedProduct, LeadSource
from django.contrib.auth import get_user_model

User = get_user_model()

from notifications.models import Notification



def create_notification(user, message):
    # Create a notification for the specified user
    Notification.objects.create(user=user, message=message)

@receiver(post_save, sender=Agent)
def create_agent_profile(sender, instance, created, **kwargs):
    if created:
        message = f"New agent created: {instance.full_name()}"
        # Notify admin or other relevant users
        for user in User.objects.filter(is_admin=True):
            create_notification(user, message)

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


@receiver(post_save, sender=Lead)
def lead_created(sender, instance, created, **kwargs):
    if created:
        message = f"New lead created: {instance.product.name} - {instance.source.name}"
        # Notify the agent associated with the lead
        create_notification(instance.agent.user, message)  # Notify the agent
        # Optionally notify the sales team or admin
        for user in User.objects.filter(is_admin=True):
            create_notification(user, message)


@receiver(post_save, sender=AssignedProduct)
def assigned_product_created(sender, instance, created, **kwargs):
    if created:
        message = f"Product {instance.product.name} assigned to agent {instance.agent.full_name()}"
        create_notification(instance.agent.user, message)  # Notify the agent
        for user in User.objects.filter(is_admin=True):
            create_notification(user, message)

