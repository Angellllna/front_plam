# Start your image with a node base image
FROM node:18-alpine as build

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file

COPY . /app/

RUN npm install --omit=dev && \
    npm ci --only=production && \
    npm run build

FROM nginx:1.23.1-alpine as production

EXPOSE 3000

WORKDIR /app

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

#starting 
# docker build -t my-app-name .

# docker images

# docker run -p 3011:3000 my-app:latest