# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import SubscriptionPayment, Subscription
from notifications.models import Notification


@receiver(post_save, sender=SubscriptionPayment)
def handle_successful_payment(sender, instance, created, **kwargs):
    if created and instance.is_successful:
        # Fetch the associated subscription
        subscription = instance.subscription

        # Update the subscription's activated status
        subscription.activated = True  # Set to True or implement your logic
        subscription.save()

        message = (
            f"Payment Successful for {subscription.plan.name} "
            f"Dear {subscription.user.username},\n\n"
            f"Your payment of ${subscription.payments.last().amount} for the plan '{subscription.plan.name}' was successful.\n"
            f"Your subscription will be active until {subscription.end_date.strftime('%d %B %Y')}.\n\n"
            f"Thank you for your support!\n"
            f"Best regards,\n"
            f"Musika Inc."
        )
        # Create a Notification object
        Notification.objects.create(user=subscription.user, message=message)
    
