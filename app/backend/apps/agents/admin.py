from django.contrib import admin

from .models import (
    Agent,
    AgentProfile,
    Preferences,
)
# Register your models here.


admin.site.register(Agent)
admin.site.register(AgentProfile)
admin.site.register(Preferences)
