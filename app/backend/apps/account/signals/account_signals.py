from django.db.models.signals import post_save,pre_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.core.cache import cache

from notifications.models import Notification
from account.models import AccountChangeLog,AccountPreferences

User = get_user_model()


@receiver(pre_save, sender=User)
def user_pre_save_handler(sender, instance, **kwargs):
    if instance.pk:  # Check if the instance already exists
        try:
            previous_instance = sender.objects.get(uuid=instance.uuid)
            # Cache the previous instance with a timeout
            cache.set(f'user_prev_{previous_instance.pk}', previous_instance, timeout=300)
        except sender.DoesNotExist:
            # Handle the case where the user doesn't exist yet
            pass


@receiver(post_save, sender=User)
def user_post_save_handler(sender, instance, created, **kwargs):
    message = ""
    previous_instance = cache.get(f'user_prev_{instance.pk}')
    
    if created:
        pass
    else:
        # if previous instance/state exists
        if previous_instance:
            # the fields to iterate through
            fields_to_check = ['is_anonymous', 'is_agent', 'is_business', 'first_name', 'last_name', 'username', 'email', 'sex', 'city', 'age']
            for field in fields_to_check:
                old_value = getattr(previous_instance, field)
                new_value = getattr(instance, field)
                
                # if the field was changed
                if old_value != new_value:
                    if field == "is_anonymous":
                        message = f"Welcome {instance.username}! Your account has been created."
                        # initialize the account preferences
                        AccountPreferences.objects.create(
                            user=instance
                        )
                    elif field == "is_agent":
                        message = f"Welcome {instance.username}! Your agent account has been registered successfully. Visit our Guides page to learn more about your role on the platform."
                    elif field == "is_business":
                        message = f"Welcome {instance.username}! Your business account has been registered successfully. Visit our Guides page to learn more about your role on the platform."
                    # add a record of the change 
                    AccountChangeLog.objects.create(
                        user=instance,
                        field_name=field,
                        old_value=old_value,
                        new_value=new_value
                    )
    
    if message != "":
        # commit an entry into the notification table
        Notification.objects.create(user=instance, message=message)
    # Optionally delete the cache entry
    cache.delete(f'user_prev_{instance.pk}')
