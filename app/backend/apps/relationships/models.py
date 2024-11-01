from django.db import models
from django.contrib.auth import get_user_model
from business.models import Business
from agents.models import Agent
from relationships.utils.models import get_field_args

User = get_user_model()



class BusinessAgentRelationship(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name='agent_relationships')
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='business_relationships')
    commission_rate = models.DecimalField(max_digits=5, decimal_places=2)
    status = models.CharField(max_length=50, default='active', choices=[('active', 'Active'), ('revoked', 'Revoked')])
    created_at = models.DateTimeField(auto_now_add=True)
    
    def revoke_relationship(self):
        if self.status != 'revoked':
            self.status = 'revoked'
            self.save(update_fields=['status'])

    def __str__(self):
        return f"{self.agent} - {self.business} ({self.status})"


class AgentApplication(models.Model):
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='applications')
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name='agent_applications')
    commission_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    status = models.CharField(max_length=50, default='pending', choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def approve_application(self):
        if self.status != 'approved':
            self.status = 'approved'
            self.save(update_fields=['status'])
    
    def reject_application(self):
        if self.status != 'rejected':
            self.status = 'rejected'
            self.save(update_fields=['status'])

    def __str__(self):
        return f"Application from {self.agent} for {self.business} ({self.status})"


class BusinessOffer(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name='offers')
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='offers')
    title = models.CharField(**get_field_args())
    description = models.TextField(**get_field_args(max_length=1000))
    offered_commission = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    expiration_date = models.DateTimeField(null=True, blank=True)
    available_slots = models.IntegerField(default=1, null=True)
    status = models.CharField(max_length=50, default='active', choices=[('active', 'Active'), ('inactive', 'Inactive')])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} from {self.business} (Commission: {self.offered_commission})"


class AcceptedOffer(models.Model):
    business_offer = models.ForeignKey(BusinessOffer, on_delete=models.CASCADE, related_name='accepted_offers')
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='accepted_offers')
    acceptance_date = models.DateTimeField(auto_now_add=True)
    commission_rate = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)  # Commission rate agreed upon acceptance
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
