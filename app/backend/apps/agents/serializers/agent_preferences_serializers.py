from rest_framework import serializers

from agents.models import Preferences


# Preferences Serializers
class PreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preferences
        fields = '__all__'
        depth = 1

class PreferencesCreateSerializer(serializers.ModelSerializer):
    class Meta(PreferencesSerializer.Meta):
        fields = ['agent', 'communication_method', 'notifications_enabled', 'preferred_time_contact']
