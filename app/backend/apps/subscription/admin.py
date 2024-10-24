from django.contrib import admin
from .models import Subscription,Plan,Feature,SubscriptionPayment
# Register your models here.

admin.site.register(Subscription)
admin.site.register(Plan)
admin.site.register(Feature)
admin.site.register(SubscriptionPayment)