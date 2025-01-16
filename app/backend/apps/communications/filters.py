import django_filters

from communications.models import (
    Conversation,
    Message,
    Participant
)


class ConversationFilter(django_filters.FilterSet):
    user_uuid = django_filters.UUIDFilter(field_name='participants__user__uuid', lookup_expr='exact')
    role = django_filters.ChoiceFilter(field_name='participants__role', choices=Participant.ROLE_CHOICES)
    uuid = django_filters.CharFilter(field_name='uuid', lookup_expr='exact')
    business_code = django_filters.CharFilter(field_name='participants__user__business_profile__code', lookup_expr='exact')
    agent_code = django_filters.CharFilter(field_name='participants__user__agent_profile__code', lookup_expr='exact')
    
    class Meta:
        model = Conversation
        fields = ['user_uuid', 'role', 'uuid', 'business_code', 'agent_code']
    


class MessageFilter(django_filters.FilterSet):
    conversation = django_filters.CharFilter(field_name='conversation__uuid', lookup_expr='exact')
    
    class Meta:
        model = Message
        fields = ['conversation']
        


