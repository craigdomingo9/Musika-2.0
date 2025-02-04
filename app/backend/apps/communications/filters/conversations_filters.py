import django_filters
from django.db.models import Q, Subquery

from communications.models import (
    Conversation,
    Participant
)


class ConversationFilter(django_filters.FilterSet):
    user_uuid = django_filters.UUIDFilter(field_name='participants__user__uuid', lookup_expr='exact')
    type = django_filters.ChoiceFilter(field_name='conversation_type', choices=Conversation.TYPE_CHOICES)
    role = django_filters.ChoiceFilter(field_name='participants__role', choices=Participant.ROLE_CHOICES)
    uuid = django_filters.CharFilter(field_name='uuid', lookup_expr='exact')
    business_code = django_filters.CharFilter(method='filter_by_business')
    agent_code = django_filters.CharFilter(field_name='participants__user__agent_profile__code', lookup_expr='exact')
    
    class Meta:
        model = Conversation
        fields = ['user_uuid', 'role', 'uuid', 'business_code', 'agent_code', 'type']
    
    def filter_by_business(self, queryset, name, value):
        if value:
            return queryset.filter(
                id__in=Subquery(
                  Participant.objects.filter(
                    user__business_profile__code=value,
                    role="business", 
                  ).values_list("conversation__id")
                )
            )
        
        return queryset
    
