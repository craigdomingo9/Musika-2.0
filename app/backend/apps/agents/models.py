from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

from business.models import Product


class Agent(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='agent_profile')
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)  # Active status of the agent

    def full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class AgentProfile(models.Model):
    agent = models.OneToOneField(Agent, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='agents/profile_pictures/', blank=True)
    minimum_commission_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    social_links = models.JSONField(blank=True, null=True)
    
    def __str__(self):
        return f"Profile of {self.agent.full_name()}"


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



class AssignedProduct(models.Model):
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='assigned_products')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='assigned_agents')
    assigned_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=[
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ], default='active')

    def __str__(self):
        return f"{self.agent.full_name()} - {self.product.title}"



class LeadSource(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name



class Lead(models.Model):
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='leads')
    source = models.ForeignKey(LeadSource, on_delete=models.CASCADE, related_name='leads')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='leads')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=50, choices=[
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('converted', 'Converted'),
        ('lost', 'Lost'),
    ], default='new')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Lead: {self.user.uuid} - Status: {self.status}"
