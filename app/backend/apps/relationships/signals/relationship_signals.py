from django.db.models.signals import post_save
from django.dispatch import receiver
from relationships.models import BusinessAgentRelationship
from notifications.actions import send_notification


@receiver(post_save, sender=BusinessAgentRelationship)
def relationship_post_save(sender, instance, created, **kwargs):
    if created:
      
        send_notification(
            [instance.agent.user], 
            f"You have a new relationship with {instance.business}."
        )
        
        send_notification(
            [instance.business.user], 
            f"A new agent relationship has been established with {instance.agent}."
        )

    else:
        if instance.status == 'revoked':
            
            # send revoke notification to agent 
            send_notification(
                [instance.agent.user], 
                f"Your relationship with {instance.business} has been revoked."
            )
            # send revoke notification to business 
            send_notification(
                [instance.business.user], 
                f"Your relationship with {instance.business} has been revoked."
            )
            

