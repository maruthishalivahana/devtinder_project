# Use Node.js LTS
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all source code
COPY . .

# Expose the port (Cloud Run uses PORT env)
EXPOSE 8080
ENV PORT=8080

# Start the server
CMD ["node", "server.js"]
