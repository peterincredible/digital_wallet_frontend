# FROM node:22-alpine AS build

# WORKDIR /app

# COPY package*.json ./
# RUN npm ci

# COPY . .

# RUN npm run build


# FROM nginx:alpine

# COPY --from=build /app/dist /usr/share/nginx/html

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# Start Vite dev server with host flag to allow Docker access
CMD ["npm", "run", "dev", "--", "--host"]