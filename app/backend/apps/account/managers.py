# managers.py
from django.contrib.auth.hashers import make_password
from django.utils.translation import gettext_lazy as _


from django.db import models
class CustomUserManager(models.Manager):
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        user = self.model(username=username, email=email)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        user = self.create_user(username, email, password)
        user.is_admin = True
        user.save(using=self._db)
        return user