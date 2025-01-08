from rest_framework import serializers

from account.models import AccountPreferences



class AccountPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountPreferences
        fields = ['id' ,'user', 'language', 'receive_notifications', 'theme', 'show_tips']
        read_only_fields = ['id', 'user']
