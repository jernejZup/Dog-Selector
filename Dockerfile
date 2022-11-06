FROM node:12.8.0-alpine

# create destination directory
RUN mkdir -p /usr/src/dog-app
WORKDIR /usr/src/dog-app

# update and install dependency
RUN apk update
RUN apk add git

COPY . /usr/src/dog-app/

RUN npm i

RUN npm rebuild node-sass

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# expose 3000 on container
EXPOSE 8080

# start the app
CMD [ "npm", "run", "serve" ]
