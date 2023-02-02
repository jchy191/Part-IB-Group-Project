# Part-IB-Group-Project

## Overview

[Frontend Webapp](Frontend)\
[Backend API Server](Backend)

## Git Branching Strategy

To make any changes, branch off from the `dev` branch. After making and testing those changes locally, create a pull request from your branch to the `dev` branch. Two people are needed to approve each pull request.

The `master` branch will be our 'production' branch which the `dev` branch will merge into after every significant new feature has been added. Five approvals for the pull request from the `dev` branch will be required.

Once we deploy to e.g., Google Cloud Platform, the `master` branch will be synchronised with our live deployed application, i.e., whatever is merged into `master` will automatically be reflected on the deployed webapp.

## Running both the Frontend and Backend together

In this directory, run `docker compose up`.
