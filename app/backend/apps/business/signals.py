from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import Business, Profile
from notifications.models import Notification


User = get_user_model()



@receiver(post_save, sender=Business)
def business_created_or_updated(sender, instance, created, **kwargs):
    if created:
        user = User.objects.get(uuid=instance.user.uuid)
        user.is_business = True
        user.save(update_fields=["is_business"])
        
        message = f"New business created: {instance.user.username}'s business"
        
        # Notify the admins
        admins = User.objects.filter(is_admin=True)
        
        for admin in admins:
            Notification.objects.create(user=admin, message=message)
    
    


@receiver(post_save, sender=Profile)
def profile_created_or_updated(sender, instance, created, **kwargs):
    if created:
        message = (
            f"Congratulations, '{instance.name}'  has been created.\n"
            f"Your business profile has been registered successfully.\n"
            f"Your business profile is now visible on the platform.\n"
            f"You can review our Guides section to understand the workflow of the platform."
            f"Best regards,\n"
            f"Musika Inc."
        )
        # Notify the user associated with the business
        Notification.objects.create(user=instance.business.user, message=message)
