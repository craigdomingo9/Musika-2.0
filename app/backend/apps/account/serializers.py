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


class AccountCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['first_name', 'last_name', 'username', 'email', 'age', 'sex', 'city', 'is_agent', 'is_business']


class AccountPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountPreferences
        fields = ['id' ,'user', 'language', 'receive_notifications', 'theme', 'show_tips']
        read_only_fields = ['id', 'user']

class PasswordChangeSerializer(serializers.Serializer):
    """
    Serializer for changing user password.
    """
    user_uuid = serializers.UUIDField(required=True, write_only=True)
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True, validators=[validate_password])
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        """
        Validate user, old password, and confirm new password.
        """
        User = get_user_model()
        user_uuid = data.get('user_uuid')
        old_password = data.get('old_password')
        new_password = data.get('new_password')
        confirm_password = data.get('confirm_password')

        try:
            user = User.objects.get(uuid=user_uuid)
        except User.DoesNotExist:
            raise ValidationError({'user_uuid': 'User not found'})

        if not user.check_password(old_password):
            raise ValidationError({'old_password': 'Invalid old password'})

        if new_password != confirm_password:
            raise ValidationError({'confirm_password': 'Passwords do not match'})

        return data

    def save(self):
        """
        Update user password.
        """
        User = get_user_model()
        user_uuid = self.validated_data['user_uuid']
        new_password = self.validated_data['new_password']
        user = User.objects.get(uuid=user_uuid)
        user.set_password(new_password)
        user.save()



    


