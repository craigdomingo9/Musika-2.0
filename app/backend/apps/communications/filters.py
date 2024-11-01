import django_filters
from .models import Conversation


class ConversationFilter(django_filters.FilterSet):
    user_uuid = django_filters.UUIDFilter(field_name='participants__user__uuid', lookup_expr='exact')
    
    class Meta:
        model = Conversation
        fields = ['user_uuid']


