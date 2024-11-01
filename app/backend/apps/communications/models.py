# models.py
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from uuid import uuid4

User = get_user_model()


from communications.utils.models import get_field_args,generate_uuid


def generate_code() -> uuid4:
    return generate_uuid(Conversation)

class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Conversation(models.Model):
    title = models.CharField(**get_field_args(max_length=255))
    uuid = models.UUIDField(default=generate_code, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    conversation_type = models.CharField(max_length=50, default="customer_platform", choices=[
        ('business_agent', 'Business-Agent Communication'),
        ('customer_business', 'Customer-Business Support'),
        ('customer_platform', 'Customer-Platform Support'),
        ('business_agent_platform', 'Business-Agent-Platform Support'),
    ])

    def __str__(self):
        return self.title


class Participant(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='participants')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('conversation', 'user')

    def __str__(self):
        return f"{self.user.username} in {self.conversation.title} as {self.role.name}"

    class Meta:
        unique_together = ('conversation', 'user')



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
