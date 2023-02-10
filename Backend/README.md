# Getting Started

## Prerequisites

A few prerequisite software is required in order to run and develop locally.

1. Python3 & PIP\
   Used for local development
2. [Postgresql 14](https://www.postgresql.org/download/)\
  Used to as a local database to simulate our actual database in Google Cloud SQL (which is a Postgresql 14 database).

## First time set up
1. Clone the repository from the parent directory `Part-IB-Group-Project`. 
2. Add the `.env` file into the `Part-IB-Group-Project/Backend` (i.e., create a `Part-IB-Group-Project/Backend/.env` file)\
   This step is required so that we do not commit & push any API keys on git.\
   The `.env` files can be found in our Google Drive.
3. Run `python3 -m venv env` to create & enter the python virtual environment, and then `pip install -r requirements.txt`
4. Set up Postgresql 14 on your machine (preferably with pgAdmin so that you can view the databases locally).\
   Database name: `locations`\
   Database user username: `postgres`\
   Database user password: `postgres`

## Development in Python venv (Virtual Environment)
1. Ensure that Postgresql is running
2. In the `Part-IB-Group-Project/Backend` directory, run\
   Mac/Linux: `source env/bin/activate`\
   Windows: `use env/bin/activate`
3. In the virtual environment, control the server using the `python manage.py ...` command, e.g., `python manage.py runserver`.

## Development in Docker (**no longer needed**)
1. Ensure Docker Desktop is running.
2. Run `docker compose up` command in the `Part-IB-Group-Project/Backend` directory.
3. The server API should start and will be accessible on [http://127.0.0.1:8000](http://127.0.0.1:8000). 

Live reload on Docker has been set up, i.e., any changes saved will visible after refreshing the webpage.
