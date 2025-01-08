from django.db import models
from django.contrib.auth import get_user_model

from .agent_models import Agent
from business.models import Product

User = get_user_model()





class AssignedProduct(models.Model):
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='assigned_products')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='assigned_agents')
    assigned_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=[
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ], default='active')

    def __str__(self):
        return f"{self.agent.full_name()} - {self.product.name}"
