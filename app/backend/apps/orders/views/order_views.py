from rest_framework import viewsets,status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters import rest_framework as filters

from orders.models import Order
from orders.filters import OrderFilter
from orders.serializers import (
    OrderSerializer,
    OrderCreateSerializer
)


# Create your views here.
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = OrderFilter
    
    def get_serializer_class(self):
        if self.action in ["create", "update"]:
            self.serializer_class = OrderCreateSerializer
        return super().get_serializer_class()

    @action(detail=True, methods=['post'], url_path='fulfill-order')
    def fulfill_order(self, request, pk=None, *args, **kwargs):
        order = self.get_object()
        try:
            fulfillment_code = request.data['fulfillment_code']
            
            if fulfillment_code != order.fulfillment_code:
                return Response({'error': 'Invalid fulfillment code'}, status=status.HTTP_400_BAD_REQUEST)

            order.fulfill_order()
            order.save()
            return Response({'status': 'Order was fulfilled'}, status=status.HTTP_200_OK)
              
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

