# Stage 1

FROM node:latest as build
LABEL maintainer="dalmatialab"

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/

EXPOSE 4200

RUN npm run build --prod

# Stage 2

FROM nginx:latest

COPY --from=build /app/dist/navigation-app /usr/share/nginx/html
