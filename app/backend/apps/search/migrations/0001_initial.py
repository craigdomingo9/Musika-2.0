# migrations/000X_enable_pg_trgm.py

from django.db import migrations

class Migration(migrations.Migration):

    operations = [
        migrations.RunSQL("CREATE EXTENSION IF NOT EXISTS pg_trgm;"),
    ]
