# Use a Node.js base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with legacy peer deps --legacy-peer-deps
RUN npm install --verbose

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000


# Start the Next.js development server
CMD ["npm", "run", "dev"]