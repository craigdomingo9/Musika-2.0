from django.db import models
from business.models import Business
from agents.models import Agent



class AgentApplication(models.Model):
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='applications')
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name='agent_applications')
    commission_rate = models.DecimalField(max_digits=5, decimal_places=3, default=0.00)
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
