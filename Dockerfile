# Use the official Node.js 22.9 image from Docker Hub
FROM node:22.9

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on (replace 3000 with your app's port if different)
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "run", "dev"]

