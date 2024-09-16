# Stage 1: Build the app
FROM node:21.7.3 AS builder

WORKDIR /frontend

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the app
FROM node:21.7.3

WORKDIR /frontend

COPY --from=builder /frontend/dist /frontend/dist

RUN npm install -g serve

# Expose port 5173
EXPOSE 5173

# Default to port 5173, can be overridden by the PORT environment variable
CMD ["sh", "-c", "serve -s dist -l ${PORT:-5173}"]
