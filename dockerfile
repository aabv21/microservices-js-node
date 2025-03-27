# Base image of the application
FROM node:20-alpine as development
LABEL maintainer="andres.buelvas.2102@gmail.com"

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 3000

# Set the environment variable
ENV NODE_ENV=development

# Start the application
CMD ["npm", "start"]

# Stage testing
FROM development as testing
CMD ["node", "--run", "ci-test"]

# Stage production
FROM development as production
ENV NODE_ENV=production
RUN rm -rf tests
RUN npm prune --production
CMD ["npm", "app.js"]