from django.contrib.auth.hashers import make_password
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.hashers import make_password,check_password
from logging import getLogger
from django.db import models
from dataclasses import dataclass

logger = getLogger(__name__)




@dataclass
class Account:
    pass


class CustomUserManager(models.Manager):
    def get_by_natural_key(self, username):
        return self.get(username=username)
    
    
    def authenticate(self, username: str, password: str) -> tuple:
        """
        Authenticate a user based on username and password.

        Args:
        - username (str): The username to authenticate.
        - password (str): The password to authenticate.

        Returns:
        - tuple: (user, is_authenticated)
        """
        try:
            user = self.get(username=username)
            if user.check_password(password):
                return user, True
            return user, False
        
        except ObjectDoesNotExist as e:
            logger.error(f"User not found: {e}")
            return None, False

    
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