from rest_framework import serializers

from notifications.models import Notification



class NotificationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = ['id', 'user', 'message', 'created_at', 'updated_at']
        depth = 1
    
    def get_sent_at(self, obj):
      return obj.sent_at()

