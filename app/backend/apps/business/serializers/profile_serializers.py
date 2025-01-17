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
        # Return relative URL instead of absolute URL
        return obj.logo.url.replace(f'http://{self.context.get("request").get_host()}', '')


class ProfileCreateSerializer(serializers.ModelSerializer):
    logo = serializers.ImageField()
    class Meta:
        model = Profile
        fields = ['id', 'name', 'description', 'categories', 'logo', 'cover_photo', 'phone_number', 'email', 'website', 'business_type']

