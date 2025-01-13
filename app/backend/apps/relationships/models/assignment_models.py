from django.db import models
from django.contrib.auth import get_user_model

from agents.models import Agent
from business.models import Product

User = get_user_model()


class Assignment(models.Model):
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='assignments')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='assignments')
    assigned_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=[
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ], default='active')
    
    class Meta:
        ordering = ["-assigned_at"]
    
    def deassign(self):
        if self.status == "active":
            self.status = "inactive"
            self.save(update_fields=['status'])

    def __str__(self):
        return f"{self.agent.full_name()} - {self.product.name}"
