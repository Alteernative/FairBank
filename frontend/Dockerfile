# Stage 1: Build the app
FROM node:20.17.0 AS builder

WORKDIR /frontend

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the build output to Nginx's default HTML directory
COPY --from=build /app/build /usr/share/nginx/html

#WORKDIR /frontend
#
#COPY --from=builder /frontend/dist /frontend/dist

RUN npm install -g serve

# Expose port 5173
EXPOSE 90

# Default to port 80, can be overridden by the PORT environment variable
CMD ["nginx", "-g", "daemon off;"]