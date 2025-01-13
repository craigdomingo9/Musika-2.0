from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

from relationships.models import Assignment
from notifications.actions import send_notification

User = get_user_model()





@receiver(post_save, sender=Assignment)
def assignment_post_save(sender, instance, created, **kwargs):
    if created:
        message = f"Product {instance.product.name} assigned to agent {instance.agent.full_name()}"
        recipients = []
        recipients.append(instance.agent.user)
        recipients.append(User.objects.filter(is_admin=True))
        
        send_notification(recipients=recipients, message=message)

