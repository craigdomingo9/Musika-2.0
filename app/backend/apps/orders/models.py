from django.db import models
from business.models import ProductVariant, Business
from agents.models import Agent


status_choices = [
    ('pending', 'Pending'),
    ('failed', 'Failed'),
    ('refunded', 'Refunded'),
    ('completed', 'Completed'),
]

# Create your models here.
class Order(models.Model):
    agent = models.ForeignKey(Agent, on_delete=models.DO_NOTHING, null=True, blank=True, related_name='orders')
    product = models.ForeignKey(ProductVariant, on_delete=models.DO_NOTHING, related_name='orders')
    agent_earning = models.DecimalField(decimal_places=2, max_digits=10, null=True, blank=True)
    business_earning = models.DecimalField(decimal_places=2, max_digits=10, null=True, blank=True)
    status = models.CharField(max_length=50, choices=status_choices, default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
