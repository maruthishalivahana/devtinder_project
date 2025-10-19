# Use Node.js LTS
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all source code
COPY . .

# Expose the Cloud Run port
EXPOSE 8080
ENV PORT=8080

# Start from src/app.js
CMD ["node", "src/app.js"]
