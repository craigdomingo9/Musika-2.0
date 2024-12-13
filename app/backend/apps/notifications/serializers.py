from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Notification
        fields = ['id' ,'user', 'message', 'sent_at', 'is_read', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'message', 'created_at', 'updated_at']
        depth = 1
    
    def get_sent_at(self, obj):
      return obj.sent_at()

