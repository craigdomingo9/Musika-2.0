from django.contrib import admin

# Register your models here.
from relationships.models import (
  AcceptedOffer,
  AgentApplication,
  BusinessAgentRelationship,
  BusinessOffer,
  AssignedProduct
)

admin.site.register(AcceptedOffer)
admin.site.register(AgentApplication)
admin.site.register(BusinessAgentRelationship)
admin.site.register(BusinessOffer)
admin.site.register(AssignedProduct)
