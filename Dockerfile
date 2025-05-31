# Build stage: create the production build of the React app
FROM node:22-alpine AS build

WORKDIR /frontend

# Copy only the package.json and package-lock.json first for better caching
COPY frontend/package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY frontend/. .

# Build the React app
RUN npm run build

# Production stage: serve the build with Nginx
FROM nginx:1.24-alpine

# Copy custom Nginx config to handle React Router client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# debug: print the contents of /frontend
# Copy the build output to Nginx's public directory
COPY --from=build frontend/build/client /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
