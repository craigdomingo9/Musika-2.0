from rest_framework import serializers
from django.contrib.auth import get_user_model



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
    class Meta(AccountSerializer.Meta):
        fields = ['first_name', 'last_name', 'username', 'email', 'profile_picture', 'age', 'sex', 'city', 'is_agent', 'is_business']
