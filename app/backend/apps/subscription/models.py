from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from datetime import timedelta
from django.utils import timezone


# Create your models here.

def get_field_args() -> dict:
    return {
        "max_length": 150,
        "blank": True,
        "null": True
    }


class Plan(models.Model):
    name = models.CharField(**get_field_args())
    description = models.TextField()
    price = models.DecimalField(**get_field_args(), decimal_places=2,max_digits=10)
    billing_cycle = models.CharField(**get_field_args())  # e.g., 'monthly', 'yearly'
    features = models.ManyToManyField('Feature', related_name='plans')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Feature(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class SubscriptionPayment(models.Model):
    subscription = models.ForeignKey("Subscription", on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=50)  # e.g., 'credit_card', 'paypal'
    transaction_id = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded')
    ], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Payment of {self.amount} for {self.subscription.user.username} - {self.status}"

    @property
    def is_successful(self):
        """Check if the payment was successful."""
        return self.status == 'completed'
    




class Subscription(models.Model):
    user = models.ForeignKey(get_user_model(),on_delete=models.CASCADE,related_name="subscriptions")
    plan = models.ForeignKey('Plan', on_delete=models.CASCADE)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        if self.start_date is None:
            self.start_date = timezone.now()
            
        if self.plan.billing_cycle == 'monthly':
            self.end_date = self.start_date + timedelta(days=30)
        elif self.plan.billing_cycle == 'yearly':
            self.end_date = self.start_date + timedelta(days=365)
        
        super().save(*args, **kwargs)
    
    @property
    def next_plan(self):
        """Fetch the next available plan that costs more than the current plan."""
        next_plan = Plan.objects.filter(price__gt=self.plan.price).order_by('price').first()
        return next_plan
    
    @property
    def is_activated(self):
        """Check if the subscription has been activated based on payments."""
        return SubscriptionPayment.objects.get(subscription=self.id).status == "completed"

    @property
    def active(self):
        """Check if the subscription is currently active."""
        return self.end_date is not None and timezone.now() <= self.end_date

    @property
    def status(self):
        """Return a dictionary with the subscription status and end date."""
        return {
            "status": "Active" if self.active else "Inactive",
            "end_date": self.end_date.strftime('%d %B %Y') if self.end_date else "No expiration",
            "current_plan": self.plan.name
        }
    
    def __str__(self):
        return f"{self.user.username} - {self.plan.name}"

