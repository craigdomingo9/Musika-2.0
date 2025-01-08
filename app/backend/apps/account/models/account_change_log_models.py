# models.py
from django.db import models
from django.utils.translation import gettext_lazy as _

from account.utils.models import get_field_args
from .account_models import Account



class AccountChangeLog(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    field_name = models.CharField(**get_field_args())
    old_value = models.TextField(**get_field_args())
    new_value = models.TextField(**get_field_args())
    changed_at = models.DateTimeField(auto_now_add=True)
