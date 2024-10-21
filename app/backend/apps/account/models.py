
# models.py
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from .managers import *


class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    is_anonymous = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()

    def __str__(self):
        return self.username

    def merge_with(self, other_user):
        # Merging logic here, e.g. transferring data from the anonymous user
        pass

    @property
    def is_authenticated(self):
        return not self.is_anonymous