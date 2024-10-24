# models.py
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone


User = get_user_model()

class Conversation(models.Model):
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Participant(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='participants')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('conversation', 'user')

    def __str__(self):
        return f"{self.user.username} in {self.conversation.title}"


class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(Participant, on_delete=models.CASCADE, related_name='participant_messages')
    content = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    was_read_at = models.DateTimeField(null=True, blank=True)
    
    def mark_as_read(self):
        """Mark the message as read by setting the was_read_at timestamp."""
        if self.was_read_at is None:  # Only update if it hasn't been set
            self.was_read_at = timezone.now()  # Import and use timezone from django.utils
            self.save(update_fields=['was_read_at'])

    def __str__(self):
        return f"Message from {self.sender.user.username} in {self.conversation.title}"
