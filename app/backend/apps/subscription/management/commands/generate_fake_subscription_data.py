# generate_fake_subscription_data.py
import random
from django.core.management.base import BaseCommand
from faker import Faker
from subscription.models import Feature, Plan




class Command(BaseCommand):
    help = 'Generate fake features and plans'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Generate fake features
        features = []
        for _ in range(10):  # Generate 10 features
            feature = Feature(
                name=fake.catch_phrase(),
                description=fake.text(max_nb_chars=200)
            )
            features.append(feature)

        Feature.objects.bulk_create(features)
        self.stdout.write(self.style.SUCCESS('Successfully created fake features'))

        # Generate fake plans
        plans = []
        for _ in range(5):  # Generate 5 plans
            plan = Plan(
                name=fake.word().capitalize() + " Plan",
                description=fake.text(max_nb_chars=300),
                price=round(random.uniform(10.0, 100.0), 2),  # Random price between 10 and 100
                billing_cycle=random.choice(['monthly', 'yearly'])
            )
            plans.append(plan)

        Plan.objects.bulk_create(plans)
        self.stdout.write(self.style.SUCCESS('Successfully created fake plans'))