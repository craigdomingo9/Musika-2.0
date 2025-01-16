from django.db import models
from django.contrib.auth import get_user_model

from .conversation_models import Conversation

User = get_user_model()




class Participant(models.Model):
  
    ROLE_CHOICES = [
        ('customer', 'Customer'),
        ('business', 'Business'),
        ('platform', 'Platform'),
        ('agent', 'Agent'),
    ]
    
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='participants')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='customer')
    joined_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('conversation', 'user')

    def __str__(self):
        return f"{self.user.username} in {self.conversation.title} as {self.role}"

    class Meta:
        unique_together = ('conversation', 'user')
