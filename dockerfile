#built upon official node.js lite version
FROM node:lts-alpine as build-stage
# Making the work directory project folder/app
WORKDIR /app
#using all package.json as blueprint. Copies it into ./ or /app
COPY package*.json .
#runs the npm install command and creates node_modules
RUN npm install
#copy .=source .=destination
COPY . .
#starts the project up.
RUN npm run serve