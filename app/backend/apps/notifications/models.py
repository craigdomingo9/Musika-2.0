from django.db import models
from django.contrib.auth import get_user_model


class Notification(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    message = models.CharField(max_length=1000)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ["-id"]
    
    def mark_as_read(self):
        """Mark the notification as read"""
        if not self.is_read:  # Only update if it hasn't been set
            self.is_read = True
            self.save(update_fields=['is_read'])

    def __str__(self):
        return self.message

