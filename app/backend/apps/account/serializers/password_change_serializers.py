from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model




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
