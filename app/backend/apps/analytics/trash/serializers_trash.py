# from rest_framework import serializers
# from .models_trash import Acquisition, Interaction, ProductAnalytics, AgentAnalytics, BusinessAnalytics

# class AcquisitionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Acquisition
#         fields = '__all__'


# class InteractionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Interaction
#         fields = '__all__'


# class ProductAnalyticsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ProductAnalytics
#         fields = '__all__'


# class AgentAnalyticsSerializer(serializers.ModelSerializer):
#     conversion_rate = serializers.SerializerMethodField()
#     customer_retention = serializers.SerializerMethodField()
    
#     class Meta:
#         model = AgentAnalytics
#         fields = '__all__'
    
#     def get_conversion_rate(self, obj):
#         return obj.conversion_rate
    
#     def get_customer_retention(self, obj):
#         return obj.customer_retention


# class BusinessAnalyticsSerializer(serializers.ModelSerializer):
#     growth_rate = serializers.SerializerMethodField()
#     customer_lifetime_value = serializers.SerializerMethodField()
    
#     class Meta:
#         model = BusinessAnalytics
#         fields = '__all__'
    
#     def get_growth_rate(self, obj):
#         return obj.growth_rate
    
#     def get_customer_lifetime_value(self, obj):
#         return obj.customer_lifetime_value
        

