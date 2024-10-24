from rest_framework import serializers


from .models import Subscription, Plan, Feature, SubscriptionPayment



class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = '__all__'


class PlanSerializer(serializers.ModelSerializer):
    features = FeatureSerializer(many=True)

    class Meta:
        model = Plan
        fields = '__all__'


class SubscriptionSerializer(serializers.ModelSerializer):
    next_plan = serializers.SerializerMethodField(read_only=True)
    status = serializers.SerializerMethodField(read_only=True)
    is_active = serializers.BooleanField(read_only=True)

    class Meta:
        model = Subscription
        fields = ['id', 'user', 'plan', 'is_activated', 'start_date', 'end_date', 'is_active', 'next_plan', 'status']
        read_only_fields = ['is_activated','is_active', 'next_plan', 'status', 'start_date', 'end_date']

    def get_next_plan(self, obj):
        next_plan = obj.next_plan
        return PlanSerializer(next_plan).data if next_plan else None

    def get_is_active(self, obj):
        return obj.is_active
    
    def get_status(self, obj):
        return obj.status
    
    def create(self, validated_data):
        user = validated_data.pop('user')  # Assuming you are passing the user
        plan = validated_data.pop('plan')    # Assuming you are passing the plan
        
        subscription = Subscription.objects.create(user=user, plan=plan, **validated_data)
        return subscription


class SubscriptionPaymentSerializer(serializers.ModelSerializer):
    is_successful = serializers.BooleanField(read_only=True)

    class Meta:
        model = SubscriptionPayment
        fields = ['id', 'subscription', 'amount', 'payment_date', 'payment_method', 'transaction_id', 'status', 'is_successful']
