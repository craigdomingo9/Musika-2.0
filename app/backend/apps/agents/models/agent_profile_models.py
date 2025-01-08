from django.db import models
from django.contrib.auth import get_user_model

from .agent_models import Agent

User = get_user_model()





class AgentProfile(models.Model):
    agent = models.OneToOneField(Agent, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='images/agents/profile_pictures/', blank=True)
    minimum_commission_rate = models.DecimalField(max_digits=5, decimal_places=3, default=0.0)
    social_links = models.JSONField(blank=True, null=True)
    
    def __str__(self):
        return f"Profile of {self.agent.full_name()}"

