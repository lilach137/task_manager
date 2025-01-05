# Use a slim Node.js LTS image
FROM node:20-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the server
CMD ["node", "dist/index.js"]