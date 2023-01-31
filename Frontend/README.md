# Getting Started

## Prerequisites

A few prerequisite software is required in order to run and develop locally.

1. [NPM](https://nodejs.org/en/download/)\
  Required for javascript web development.
2. [Docker](https://docs.docker.com/get-docker/)\
  Used to containerise our application.\
  https://devopswithdocker.com/ is a good place to learn more about Docker & containerisation.

## First time set up
1. Clone the repository from the parent directory `Part-IB-Group-Project`. 
2. Run the `npm install` command in the `Part-IB-Group-Project/Frontend` directory.\
3. Add the `.env` file containing the Google Maps API keys into `Part-IB-Group-Project/Frontend` (i.e., create a `Part-IB-Group-Project/Frontend/.env` file)\
This step is required so that we do not commit & push any API keys on git.

## Usual development
1. Ensure Docker Desktop is running.
2. Run `npm start` command in the `Part-IB-Group-Project/Frontend` directory.
3. The webapp should start and will be accessible on [http://localhost:3000](http://localhost:3000). 

Live reload has been set up, i.e., any changes saved will visible after refreshing the webpage.
