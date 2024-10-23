from django.contrib.auth.hashers import make_password
from django.utils.translation import gettext_lazy as _


from django.db import models


class CustomUserManager(models.Manager):
    def get_by_natural_key(self, username):
        return self.get(username=username)
    
    
    def create_anonymous_user(self):
        """Create and return a new anonymous user."""
        anonymous_user = self.model(is_anonymous=True)
        anonymous_user.save(using=self._db)
        return anonymous_user

    def create_superuser(self, username, email, password):
        """Create and return a new superuser."""
        user = self.model(
            username=username,
            email=email,
            is_admin=True,
            is_staff=True,
            is_anonymous=False  # Superusers are not anonymous
        )
        user.password = make_password(password)
        user.save(using=self._db)
        return user