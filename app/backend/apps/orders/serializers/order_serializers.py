from rest_framework import serializers
from django.contrib.auth import get_user_model

from orders.models import Order
from business.models import ProductVariant
from agents.models import Agent
from business.serializers import BusinessSerializer, ProductVariantSerializer, ProductSerializer
from agents.serializers import AgentSerializer
from account.serializers import AccountSerializer
User = get_user_model()

class OrderProductVariantSerializer(ProductVariantSerializer):
    product = ProductSerializer(read_only=True)

class OrderSerializer(serializers.ModelSerializer):
    business = BusinessSerializer(read_only=True)
    agent = AgentSerializer(read_only=True)
    customer = AccountSerializer(read_only=True)
    product = OrderProductVariantSerializer(read_only=True)
    
    class Meta:
        model = Order
        exclude = ['fulfillment_code']
        depth = 2
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get('request')

        if request and hasattr(request, 'user') and instance.customer == request.user:
            data['fulfillment_code'] = instance.get_order_code()  # Assuming you have a get_order_code() method on your Order model
        return data


class OrderCreateSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    agent = serializers.PrimaryKeyRelatedField(queryset=Agent.objects.all(), required=False)
    product = serializers.PrimaryKeyRelatedField(queryset=ProductVariant.objects.all())
    
    class Meta:
        model = Order
        fields = [
            'customer',
            'agent',
            'product',
        ]

