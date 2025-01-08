from django.db import models
from agents.models import Agent
from .business_offer_models import BusinessOffer



class AcceptedOffer(models.Model):
    business_offer = models.ForeignKey(BusinessOffer, on_delete=models.CASCADE, related_name='accepted_offers')
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='accepted_offers')
    acceptance_date = models.DateTimeField(auto_now_add=True)
    commission_rate = models.DecimalField(max_digits=10, decimal_places=3, blank=True, null=True)  # Commission rate agreed upon acceptance
    status = models.CharField(max_length=50, default='active', choices=[
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('revoked', 'Revoked')
    ])
    updated_at = models.DateTimeField(auto_now=True)
    
    
    def revoke_accepted_offer(self):
        if self.status != 'revoked':
            self.status = 'revoked'
            self.save(update_fields=['status'])

    def __str__(self):
        return f"Accepted Offer: {self.business_offer.title} by {self.agent} (Accepted on {self.acceptance_date})"
