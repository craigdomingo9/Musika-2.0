from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import BusinessAgentRelationship, AgentApplication, BusinessOffer, AcceptedOffer
from notifications.models import Notification
from agents.models import Agent

User = get_user_model()

@receiver(post_save, sender=BusinessAgentRelationship)
def notify_admin_and_agents_business_relationship(sender, instance, created, **kwargs):
    if created:
        # Create notification for the agent
        Notification.objects.create(
            user=instance.agent.user,
            message=f"You have a new relationship with {instance.business}."
        )

        # Create notification for the business
        Notification.objects.create(
            user=instance.business.user,
            message=f"A new agent relationship has been established with {instance.agent}."
        )
    else:
        if instance.status == 'revoked':
            # send revoke notification to agent 
            Notification.objects.create(
                user=instance.agent.user,  # Assuming the agent has a related user
                message=f"Your relationship with {instance.business} has been revoked."
            )
            # send revoke notification to business 
            Notification.objects.create(
                user=instance.business.user,  # Assuming the agent has a related user
                message=f"Your relationship with {instance.business} has been revoked."
            )



@receiver(post_save, sender=AgentApplication)
def notify_business_and_admin_agent_application(sender, instance, created, **kwargs):
    if created:
        # Create notification for the business
        Notification.objects.create(
            user=instance.business.user,  # Assuming the business has a creator
            message=f"You have a new application from {instance.agent}."
        )
        
        # Create notification for all admins
        admins = User.objects.filter(is_admin=True)

        # Create notification for admins
        for admin in admins:
            Notification.objects.create(
                user=admin,  # You might need to adjust this to a User instance
                message=f"New application from {instance.agent} for {instance.business}."
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
            Notification.objects.create(
                user=instance.agent.user,  # Assuming the agent has a related user
                message=f"Your application has been approved."
            )
        elif instance.status == 'rejected':
            Notification.objects.create(
                user=instance.agent.user,  # Assuming the agent has a related user
                message=f"Your application has been rejected."
            )

@receiver(post_save, sender=BusinessOffer)
def notify_admin_and_agents_business_offer(sender, instance, created, **kwargs):
    if created:
        agent = instance.agent

        # Create notifications for all agents
        Notification.objects.create(
            user=agent.user,
            message=f"A new offer '{instance.title}' is available from {instance.business}."
        )
        # notify the admin as well
        admins = User.objects.filter(is_admin=True)
        for admin in admins:
            Notification.objects.create(
                user=admin,
                message=f"A new offer '{instance.title}' has been created by {instance.business}."
            )


@receiver(post_save, sender=AcceptedOffer)
def create_relationship_on_accepted_offer(sender, instance, created, **kwargs):
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
        Notification.objects.create(
            user=instance.agent.user,
            message=f"Your acceptance of the offer '{instance.business_offer.title}' has been recorded."
        )

        # Send notification to the business owner
        Notification.objects.create(
            user=instance.business_offer.business.user,
            message=f"The offer '{instance.business_offer.title}' has been accepted by {instance.agent}."
        )

        # Send notification to all admins
        admins = User.objects.filter(is_staff=True)
        for admin in admins:
            Notification.objects.create(
                user=admin,
                message=f"The offer '{instance.business_offer.title}' has been accepted by {instance.agent}."
            )
    else:
        if instance.status == 'revoked':
            Notification.objects.create(
                user=instance.agent.user,  # Assuming the agent has a related user
                message=f"You did not qualify for the {instance.business_offer.title}. Better luck next time."
            )
