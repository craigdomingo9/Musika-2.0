# serializers.py
from rest_framework import serializers
from .models import Order
from business.serializers import BusinessSerializer


class OrderSerializer(serializers.ModelSerializer):
    business = BusinessSerializer(read_only=True)
    class Meta:
        model = Order
        fields = [
            'id',
            'customer',
            'agent',
            'business',
            'product',
            'agent_earning',
            'business_earning',
            'status',
            'created_at',
            'updated_at',
        ]
        depth = 2
        
