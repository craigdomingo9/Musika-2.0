from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os
from decouple import config

class Command(BaseCommand):
    help = 'Create a Django superuser'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        username = config('DJANGO_SUPERUSER_USERNAME')
        email = config('DJANGO_SUPERUSER_EMAIL')
        password = config('DJANGO_SUPERUSER_PASSWORD')

        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.WARNING('Superuser already exists.'))
        else:
            User.objects.create_superuser(username=username, email=email, password=password)
            self.stdout.write(self.style.SUCCESS('Superuser created successfully.'))