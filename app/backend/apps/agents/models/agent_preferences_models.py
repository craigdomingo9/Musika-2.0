from django.db import models
from django.contrib.auth import get_user_model

from .agent_models import Agent

User = get_user_model()



class Preferences(models.Model):
    agent = models.OneToOneField(Agent, on_delete=models.CASCADE, related_name='preferences')
    communication_method = models.CharField(max_length=50, choices=[
        ('email', 'Email'),
        ('phone', 'Phone'),
        ('sms', 'SMS'),
    ], default='email')
    notifications_enabled = models.BooleanField(default=True)
    preferred_time_contact = models.TimeField(null=True, blank=True)  # Time of day they prefer to be contacted

    def __str__(self):
        return f"Preferences for {self.agent.full_name()}"
