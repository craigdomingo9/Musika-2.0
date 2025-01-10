from django.contrib import admin
from .models import (
    Agent,
    AgentProfile,
    Preferences,
    Lead,
    LeadSource
)
# Register your models here.


admin.site.register(Agent)
admin.site.register(AgentProfile)
admin.site.register(Preferences)
admin.site.register(Lead)
admin.site.register(LeadSource)