# Use official Node.js LTS image
FROM node:22

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./

# Install the application dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the NestJS app
RUN npm run build

# Command to run the application
CMD ["node", "dist/src/main"]