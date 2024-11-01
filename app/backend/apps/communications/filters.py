import django_filters
from .models import (
    Conversation,
    Message
)


class ConversationFilter(django_filters.FilterSet):
    user_uuid = django_filters.UUIDFilter(field_name='participants__user__uuid', lookup_expr='exact')
    role = django_filters.CharFilter(field_name='participants__role__name', lookup_expr='exact')
    type = django_filters.CharFilter(field_name='conversation_type', lookup_expr='exact')
    
    class Meta:
        model = Conversation
        fields = ['user_uuid', 'role', 'type']


class MessageFilter(django_filters.FilterSet):
    conversation = django_filters.CharFilter(field_name='conversation__uuid', lookup_expr='exact')
    
    class Meta:
        model = Message
        fields = ['conversation']


