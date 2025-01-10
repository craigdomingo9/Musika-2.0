from django.db import models
from business.models import Business
from agents.models import Agent



class BusinessAgentRelationship(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name='agent_relationships')
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='business_relationships')
    commission_rate = models.DecimalField(max_digits=5, decimal_places=3)
    status = models.CharField(max_length=50, default='active', choices=[('active', 'Active'), ('revoked', 'Revoked')])
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ["-created_at"]
    
    def revoke_relationship(self):
        if self.status != 'revoked':
            self.status = 'revoked'
            self.save(update_fields=['status'])

    def __str__(self):
        return f"{self.agent} - {self.business} ({self.status})"




