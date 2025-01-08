# models.py
from django.db import models
from django.utils.translation import gettext_lazy as _

from account.utils.models import get_field_args
from .account_models import Account



class AccountPreferences(models.Model):
    user = models.OneToOneField(Account, on_delete=models.CASCADE, related_name='preferences')
    
    language = models.CharField(**get_field_args(), default='en')
    receive_notifications = models.BooleanField(default=True)
    theme = models.CharField(max_length=20, choices=[
        ('light', 'Light'),
        ('dark', 'Dark'),
    ], default='light')
    show_tips = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.username}'s Preferences"
