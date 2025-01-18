from django.db import models
from uuid import uuid4

from communications.utils.models import (
  get_field_args,
  generate_uuid
)


def generate_code() -> uuid4:
    return generate_uuid(Conversation)



class Conversation(models.Model):
    TYPE_CHOICES = [
        ('business_agent', 'Business-Agent Communication'),
        ('customer_business', 'Customer-Business Support'),
        ('customer_platform', 'Customer-Platform Support'),
        ('business_agent_platform', 'Business-Agent-Platform Support'),
    ]
    title = models.CharField(**get_field_args(max_length=255))
    uuid = models.UUIDField(default=generate_code, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    conversation_type = models.CharField(max_length=50, default="customer_platform", choices=TYPE_CHOICES)

    def __str__(self):
        return self.title
      
      