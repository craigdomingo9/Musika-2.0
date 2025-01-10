from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from relationships.models import BusinessAgentRelationship, AcceptedOffer
from notifications.actions import send_notification

User = get_user_model()


@receiver(post_save, sender=AcceptedOffer)
def accepted_offer_post_save(sender, instance, created, **kwargs):
    if created:
        # Create a new BusinessAgentRelationship when an AcceptedOffer is created
        BusinessAgentRelationship.objects.create(
            business=instance.business_offer.business,
            agent=instance.agent,
            commission_rate=instance.business_offer.offered_commission,
        )
        
        # copy the commission rate of the offer
        accepted_offer = AcceptedOffer.objects.get(id=instance.pk)
        accepted_offer.commission_rate = instance.business_offer.offered_commission
        accepted_offer.save(update_fields=['commission_rate'])

        # Send notification to the agent
        send_notification(
            [instance.agent.user],
            f"Your acceptance of the offer '{instance.business_offer.title}' has been recorded."
        )

        # Send notification to the business owner
        send_notification(
            [instance.business_offer.business.user],
            f"The offer '{instance.business_offer.title}' has been accepted by {instance.agent}."
        )

        # Send notification to all admins
        admins = User.objects.filter(is_staff=True)
        
        send_notification(
            admins,
            f"The offer '{instance.business_offer.title or 'by '+ instance.business_offer.business.profile.name}' has been accepted by {instance.agent}."
        )
        
    else:
        if instance.status == 'revoked':
            send_notification(
                [instance.agent.user],
                f"You did not qualify for the {instance.business_offer.title or ""}. Better luck next time."
            )
            
