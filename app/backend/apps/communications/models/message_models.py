from django.db import models
from django.utils import timezone

from .conversation_models import Conversation
from .participant_models import Participant


class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(Participant, on_delete=models.CASCADE, related_name='participant_messages')
    content = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    was_read = models.BooleanField(default=False)
    was_read_at = models.DateTimeField(null=True, blank=True)
    
    def mark_as_read(self):
        """Mark the message as read by setting the was_read_at timestamp."""
        if self.was_read_at is None:  # Only update if it hasn't been set
            self.was_read_at = timezone.now()  # Import and use timezone from django.utils
            self.was_read = True
            self.save(update_fields=['was_read_at'])

    def __str__(self):
        return f"Message from {self.sender.user.username} in {self.conversation.title}"
