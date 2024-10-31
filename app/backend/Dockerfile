FROM python:3.12-alpine

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


# RUN apk update && apk add --no-cache build-base

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt --default-timeout=10000000

# Copy the project files
COPY . .

# Start the application
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000"]