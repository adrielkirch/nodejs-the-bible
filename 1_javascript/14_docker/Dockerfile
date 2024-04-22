FROM node:20-bullseye
WORKDIR /app
USER root
COPY ./package*.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ] || [ "$NODE_ENV" = "stagging" ]; \
        then npm install; \
        else npm install --only=production; \
        fi
COPY . .
EXPOSE 9000
