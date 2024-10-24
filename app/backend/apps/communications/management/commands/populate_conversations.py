# populate.py
import random
from django.core.management.base import BaseCommand
from faker import Faker
from communications.models import Conversation, Participant, Message
from notifications.models import Notification
from django.contrib.auth import get_user_model


User = get_user_model()

class Command(BaseCommand):
    help = 'Populate the database with fake data'

    def handle(self, *args, **kwargs):
        fake = Faker()
        
        # Create some users
        users = [User.objects.create_superuser(username=fake.user_name(), email=fake.email(), password='password') for _ in range(10)]
        
        # Create conversations
        for _ in range(5):
            conversation = Conversation.objects.create(title=fake.sentence(nb_words=4))
            
            # Add participants to the conversation
            participant_count = random.randint(2, 5)
            selected_users = random.sample(users, participant_count)
            participants = []
            for user in selected_users:
                participant = Participant.objects.create(conversation=conversation, user=user)
                participants.append(participant)
            
            # Add messages to the conversation
            message_count = random.randint(5, 15)
            for _ in range(message_count):
                sender = random.choice(participants)  # Select from Participant instances
                Message.objects.create(
                    conversation=conversation,
                    sender=sender,  # Use the Participant instance here
                    content=fake.text(max_nb_chars=200),
                )
        
        # Create notifications for users
        for user in users:
            for _ in range(random.randint(1, 3)):  # Random notifications for each user
                Notification.objects.create(
                    user=user,
                    message=fake.sentence(),
                )
        
        self.stdout.write(self.style.SUCCESS('Database populated with fake data!'))