from django.db import models
from business.models import Business
from agents.models import Agent
from relationships.utils.models import get_field_args





class BusinessOffer(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name='offers')
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='offers')
    title = models.CharField(**get_field_args())
    description = models.TextField(**get_field_args(max_length=1000))
    offered_commission = models.DecimalField(max_digits=10, decimal_places=3, blank=True, null=True)
    expiration_date = models.DateTimeField(null=True, blank=True)
    available_slots = models.IntegerField(default=1, null=True)
    status = models.CharField(max_length=50, default='pending', choices=[('pending', 'Pending'), ('cancelled', 'Cancelled'), ('rejected', 'Rejected'), ('accepted', 'Accepted')])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ["-created_at"]
        
    def cancel_offer(self):
        if self.status == 'pending':
            self.status = 'cancelled';
            self.save(update_fields=['status'])
            
    def reject_offer(self):
        if self.status == 'pending':
            self.status = 'rejected';
            self.save(update_fields=['status'])
            
    def accept_offer(self):
        if self.status == 'pending':
            self.status = 'accepted';
            self.save(update_fields=['status'])
        

    def __str__(self):
        return f"{self.title} from {self.business} (Commission: {self.offered_commission})"
