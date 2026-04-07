# use nodejs image
FROM node:22-alpine AS build

# create working dir
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# npm install
RUN npm ci

# copy all source code to container
COPY . .

# get value from following variable
ARG VITE_API_URL
ARG VITE_AUTH_STORAGE_KEY

# build
RUN npm run build

# use nginx as web server
FROM nginx:alpine

# move build to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# set nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# expose container to use 8080 (same port in nginx.conf)
EXPOSE 8080

# start nginx
CMD ["nginx", "-g", "daemon off;"]
