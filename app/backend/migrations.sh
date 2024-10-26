#!/bin/bash

# Activate virtual environment if needed
# source /path/to/your/venv/bin/activate

# Run makemigrations and migrate
echo "Making migrations..."
python manage.py makemigrations

if [ $? -ne 0 ]; then
    echo "Error while making migrations."
    exit 1
fi

echo "Applying migrations..."
python manage.py migrate

if [ $? -ne 0 ]; then
    echo "Error while applying migrations."
    exit 1
fi

echo "Migrations completed successfully."