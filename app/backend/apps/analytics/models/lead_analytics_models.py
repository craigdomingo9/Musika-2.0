from django.db import models
from django.contrib.auth import get_user_model

from agents.models import Agent
from business.models import Product

User = get_user_model()



class LeadSource(models.Model):
    short_name = models.CharField(max_length=25, primary_key=True)
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
