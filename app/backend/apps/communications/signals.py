# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Message
from notifications.models import Notification

@receiver(post_save, sender=Message)
def create_notification(sender, instance, created, **kwargs):
    if created:
        # Notify all participants in the conversation except the sender
        participants = instance.conversation.participants.exclude(user=instance.sender.user)
        for participant in participants:
            Notification.objects.create(
                user=participant.user,
                message=f"{instance.sender.user.username} sent a new message in '{instance.conversation.title}'."
            )