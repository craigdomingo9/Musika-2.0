import django_filters

from communications.models import (
    Message,
)




class MessageFilter(django_filters.FilterSet):
    conversation = django_filters.CharFilter(field_name='conversation__uuid', lookup_expr='exact')
    
    class Meta:
        model = Message
        fields = ['conversation']
        
