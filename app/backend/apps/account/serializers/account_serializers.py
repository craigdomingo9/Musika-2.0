from rest_framework import serializers
from django.contrib.auth import get_user_model



class AccountSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = get_user_model()
        fields = '__all__'

    def get_profile_picture(self, obj):
        try:
            if obj.profile_picture:
                request = self.context.get('request')
                if request:
                    host = request.get_host()
                else:
                    host = 'localhost:8000'  # Default host if request is not available
                return obj.profile_picture.url.replace(f'http://{host}', '')
            return None 
        except Exception as e:
            print(f"Error getting profile picture URL: {e}")
            return None
    
    def get_full_name(self, obj):
        return obj.get_full_name()
    
    def validate_empty_values(self, data):
        return super().validate_empty_values(data)


class AccountCreateSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(required=False)
    
    class Meta:
        model = get_user_model()
        fields = ['first_name', 'last_name', 'username', 'email', 'profile_picture', 'age', 'sex', 'city', 'country_code', 'phone_number', 'address', 'is_agent', 'is_business']
