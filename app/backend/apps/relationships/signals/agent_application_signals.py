from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from relationships.models import BusinessAgentRelationship, AgentApplication
from notifications.actions import send_notification

User = get_user_model()

@receiver(post_save, sender=AgentApplication)
def agent_application_post_save(sender, instance, created, **kwargs):
    if created:
        # Create notification for the business
        send_notification(
            [instance.business.user],
            f"You have a new application from {instance.agent}."
        )
        
        # Create notification for all admins
        admins = User.objects.filter(is_admin=True)
        send_notification(
            admins,
            f"New application from {instance.agent} for {instance.business}."
        )

    else:
        # Check if the application status changed to approved
        if instance.status == 'approved':
            # Create a new BusinessAgentRelationship with the offered commission rate
            BusinessAgentRelationship.objects.create(
                business=instance.business,
                agent=instance.agent,
                commission_rate=instance.commission_rate,  # Use the commission rate from the application
                status='active'
            )
            send_notification(
                [instance.agent.user],
                f"Your application to {instance.business.profile.name} has been approved."
            )
        elif instance.status == 'rejected':
            send_notification(
                [instance.agent.user],
                f"Your application to {instance.business.profile.name} has been rejected."
            )
            