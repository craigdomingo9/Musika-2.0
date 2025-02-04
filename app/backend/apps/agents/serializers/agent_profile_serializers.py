from rest_framework import serializers

from agents.models import AgentProfile, Agent



# AgentProfile Serializers
class AgentProfileSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()
    class Meta:
        model = AgentProfile
        fields = '__all__'
        depth = 1
    
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
        

class AgentProfileCreateSerializer(serializers.ModelSerializer):
    agent = serializers.PrimaryKeyRelatedField(queryset=Agent.objects.all())
    class Meta(AgentProfileSerializer.Meta):
        fields = ['agent', 'bio', 'profile_picture', 'minimum_commission_rate', 'social_links']  # Exclude related fields
