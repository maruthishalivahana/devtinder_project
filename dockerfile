# Use official Node.js LTS image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy only package files first (to leverage Docker layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all source files into the container
COPY . .

# Expose Cloud Run port (Cloud Run uses PORT env variable, default 8080)
EXPOSE 8080

# Set environment variable for production
ENV NODE_ENV=production

# Start the application
CMD ["node", "server.js"]
