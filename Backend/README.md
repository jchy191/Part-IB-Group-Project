# Getting Started

## Prerequisites

A few prerequisite software is required in order to run and develop locally.

1. Python3 & PIP\
   Used for local development
2. [Docker](https://docs.docker.com/get-docker/)\
  Used to containerise our application.\
  https://devopswithdocker.com/ is a good place to learn more about Docker & containerisation.

## First time set up
1. Clone the repository from the parent directory `Part-IB-Group-Project`. 
2. Add the `.env` file into the `Part-IB-Group-Project/Backend` (i.e., create a `Part-IB-Group-Project/Backend/.env` file)\
This step is required so that we do not commit & push any API keys on git.
3. Run `python3 -m venv env` to create & enter the python virtual environment, and then `pip install -r requirements.txt`

## Development in Python venv (Virtual Environment)
1. In the `Part-IB-Group-Project/Backend` directory, run\
   Mac/Linux: `source env/bin/activate`\
   Windows: `use env/bin/activate`
2. In the virtual environment, control the server using the `python manage.py ...` command, e.g., `python manage.py runserver`.

## Development in Docker
1. Ensure Docker Desktop is running.
2. Run `docker compose up` command in the `Part-IB-Group-Project/Backend` directory.
3. The server API should start and will be accessible on [http://127.0.0.1:8000](http://127.0.0.1:8000). 

Live reload on Docker has been set up, i.e., any changes saved will visible after refreshing the webpage.
