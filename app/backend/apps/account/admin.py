from django.contrib import admin


from .models import Account,AccountChangeLog,AccountPreferences


# Register your models here.
admin.site.register(Account)
admin.site.register(AccountChangeLog)
admin.site.register(AccountPreferences)