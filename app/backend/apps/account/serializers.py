from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

from .models import AccountPreferences


class AccountSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()
    
    class Meta:
        model = get_user_model()
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'profile_picture', 'uuid', 'age', 'sex', 'city', 'is_agent', 'is_business', 'is_anonymous', 'is_active', 'is_admin', 'created_at','updated_at']

    def get_profile_picture(self, obj):
        # Return relative URL instead of absolute URL
        return obj.profile_picture.url.replace(f'http://{self.context.get("request").get_host()}', '')
    
    def validate_empty_values(self, data):
        return super().validate_empty_values(data)


class AccountCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['first_name', 'last_name', 'username', 'email', 'profile_picture', 'age', 'sex', 'city', 'is_agent', 'is_business']


class AccountPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountPreferences
        fields = ['id' ,'user', 'language', 'receive_notifications', 'theme', 'show_tips']
        read_only_fields = ['id', 'user']

class PasswordChangeSerializer(serializers.Serializer):
    """
    Serializer for changing user password.
    """
    email = serializers.CharField(required=True, write_only=True)
    password = serializers.CharField(required=True, write_only=True, validators=[validate_password])

    def validate(self, data):
        return data

    def save(self):
        """
        Update user password.
        """
        User = get_user_model()
        email = self.validated_data['email']
        new_password = self.validated_data['password']
        user = User.objects.get(email=email)
        user.set_password(new_password)
        user.save()



    


