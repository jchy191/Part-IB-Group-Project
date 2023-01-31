FROM node:18.4.0-alpine

EXPOSE 3000

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

# add app
COPY . ./

# start app
CMD ["react-scripts", "start"]