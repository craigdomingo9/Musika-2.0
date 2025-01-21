from django.db import models
from django.contrib.auth import get_user_model

from business.models import ProductVariant, Business
from agents.models import Agent
from orders.models.utils import generate_unique_code

User = get_user_model()

def generate_code():
    return generate_unique_code(Order)



# Create your models here.
class Order(models.Model):
    STATUS_CHOICES = [
      ('pending', 'Pending'),
      ('refunded', 'Refunded'),
      ('cancelled', 'Cancelled'),
      ('completed', 'Completed'),
    ]
    customer = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=False, blank=False, related_name='orders')
    agent = models.ForeignKey(Agent, on_delete=models.DO_NOTHING, null=True, blank=True, related_name='orders')
    business = models.ForeignKey(Business, on_delete=models.DO_NOTHING, null=True, blank=True, related_name='orders')
    product = models.ForeignKey(ProductVariant, on_delete=models.DO_NOTHING, related_name='orders')
    agent_earning = models.DecimalField(decimal_places=2, max_digits=10, null=True, blank=True)
    business_earning = models.DecimalField(decimal_places=2, max_digits=10, null=True, blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending')
    fulfillment_code = models.CharField(default=generate_code, unique=True)
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.customer.first_name or "New customer"} ordered {self.product.product.name}"
    
    def get_order_code(self):
      return self.fulfillment_code
    
    def fulfill_order(self):
        if self.status == "pending":
            self.status = "completed"
            self.save(update_fields=['status'])
    
    class Meta:
        ordering = ["-created_at"]

