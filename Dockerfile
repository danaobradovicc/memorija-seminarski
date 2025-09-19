
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci || npm i
COPY . .
ARG BUILD_DIR=dist
RUN npm run build


FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
ARG BUILD_DIR=dist
COPY --from=build /app/${BUILD_DIR}/ /usr/share/nginx/html/
EXPOSE 80
