FROM python:3.12-alpine

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app/backend

# Copy the requirements file
COPY ./app/backend/requirements.txt .

# Install dependencies
RUN pip3 install --no-cache-dir -r requirements.txt 

# Copy the project files
COPY ./app/backend/ .

# Copy the .env file
COPY ./app/backend/.env .


# Start the application
CMD ["gunicorn", "core.core.wsgi:application", "--bind", "0.0.0.0:8000"]