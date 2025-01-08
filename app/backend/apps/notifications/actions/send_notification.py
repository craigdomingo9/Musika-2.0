from django.contrib.auth import get_user_model

from notifications.models import Notification

User = get_user_model()


def send_notification(recipients, message):
    for recipient in recipients:
        if isinstance(recipient, User):  # Ensure recipient is a user instance
            Notification.objects.create(user=recipient, message=message)