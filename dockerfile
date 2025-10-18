# Use Node.js LTS as base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of your source code
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Cloud Run sets PORT env variable automatically; use it if available
ENV PORT=8080

# Start the app
CMD ["node", "server.js"]
