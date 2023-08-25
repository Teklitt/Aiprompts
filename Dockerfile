FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Copy local directories to the current local directory of our docker image (/app)
COPY ./app ./app
COPY ./components ./components
copy ./public ./public
COPY ./styles ./styles
COPY ./utils ./utils
copy ./public ./public


# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install 

EXPOSE 3005

CMD npm run dev