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
        # Return relative URL instead of absolute URL
        return obj.profile_picture.url.replace(f'http://{self.context.get("request").get_host()}', '')

        

class AgentProfileCreateSerializer(serializers.ModelSerializer):
    agent = serializers.PrimaryKeyRelatedField(queryset=Agent.objects.all())
    class Meta(AgentProfileSerializer.Meta):
        fields = ['agent', 'bio', 'profile_picture', 'minimum_commission_rate', 'social_links']  # Exclude related fields
