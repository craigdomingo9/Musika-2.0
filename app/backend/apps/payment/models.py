from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class Purchase(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Customer making the purchase
    agent_code = models.CharField(max_length=100, blank=True, null=True)  # Agent code
    business_code = models.CharField(max_length=100, blank=True, null=True)  # Agent code
    purchase_date = models.DateTimeField(auto_now_add=True)  # When the purchase was made
    product = models.CharField(max_length=100)  # Product purchased
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Amount of purchase

