# Use the official Node.js 19 image as base
FROM node:19

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npx", "nodemon", "-L", "--exec", "ts-node", "--esm", "-r", "tsconfig-paths/register"]
