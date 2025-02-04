from rest_framework import serializers

from business.models import (
    Profile, 
)


class ProfileSerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()
    
    class Meta:
        model = Profile
        fields = ['id', 'business', 'name', 'description', 'categories', 'logo', 'cover_photo', 'phone_number', 'email', 'website', 'business_type']
        depth = 1

    def get_logo(self, obj):
        try:
            if obj.logo:
                request = self.context.get('request')
                if request:
                    host = request.get_host()
                else:
                    host = 'localhost:8000'  # Default host if request is not available
                return obj.logo.url.replace(f'http://{host}', '')
            return None 
        except Exception as e:
            print(f"Error getting logo URL: {e}")
            return None


class ProfileCreateSerializer(serializers.ModelSerializer):
    logo = serializers.ImageField()
    class Meta:
        model = Profile
        fields = ['id', 'name', 'description', 'categories', 'logo', 'cover_photo', 'phone_number', 'email', 'website', 'business_type']

