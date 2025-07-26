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

# Generate Prisma client
RUN npx prisma generate

# Build the NestJS app
RUN npm run build

# Expose the port NestJS runs on
EXPOSE 3000

# Run migrations and start the app at runtime
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]