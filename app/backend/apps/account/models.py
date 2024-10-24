# models.py
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from uuid import uuid4
from django.contrib.auth.hashers import make_password,check_password


from .managers import *



def get_field_args():
    return {
        "max_length": 150,
        "blank": True,
        "null": True
    }


class Account(models.Model):
    first_name = models.CharField(**get_field_args())
    last_name = models.CharField(**get_field_args())
    username = models.CharField(max_length=150, unique=True, null=True)
    email = models.EmailField(unique=True, **get_field_args())
    password = models.CharField(**get_field_args())  # Store hashed passwords
    uuid = models.UUIDField(default=uuid4, editable=False, unique=True)  # Use UUIDField
    
    age = models.IntegerField(**get_field_args())
    sex = models.CharField(**get_field_args())
    city = models.CharField(**get_field_args())
    
    is_agent = models.BooleanField(default=False)
    is_business = models.BooleanField(default=False)
    
    is_anonymous = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    objects = CustomUserManager()
    
    REQUIRED_FIELDS = ["uuid",]
    USERNAME_FIELD = "username"

    def __str__(self):
        return (f"{self.username}")
    
    def get_username(self):
        return self.username

    
    def set_password(self, raw_password):
        # Custom password validation or hashing...
        password = make_password(raw_password)
        self.password = password
        self._password = raw_password
    
    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def has_module_perms(self, app_label):
        return self.is_admin

    def has_perm(self, perm, obj=None):
        return True
    
    @property
    def is_authenticated(self):
        return not self.is_anonymous
    