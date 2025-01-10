from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from relationships.models import BusinessOffer, AcceptedOffer
from notifications.actions import send_notification

User = get_user_model()

@receiver(post_save, sender=BusinessOffer)
def business_offer_post_save(sender, instance, created, **kwargs):
    if created:

        # Create notifications for all agents
        send_notification(
            [instance.agent.user],
            f"{instance.business} sent you an offer. Take action."
        )
        # notify the admin as well
        admins = User.objects.filter(is_admin=True)
        send_notification(
            admins,
            f"A new offer '{instance.title}' has been created by {instance.business}."
        )
    else:
        # Check if the offer status changed to approved
        if instance.status == 'accepted':
          
            AcceptedOffer.objects.create(
              business_offer=instance,
              agent=instance.agent
            )
