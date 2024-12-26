# serializers.py
from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'id',  # Include this if you want to expose the ID of the order
            'agent',
            'product',
            'agent_earning',
            'business_earning',
            'status',
            'created_at',
            'updated_at',
        ]
        depth = 1
        
