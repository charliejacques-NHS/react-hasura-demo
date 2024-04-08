# React Hasura Demo

This project is written to demonstrate the main functionalities of Hasura including Actions, Permissions, GraphQL API.

This project has been created from my own [React TS template](https://github.com/CharlieJ213/react-ts-skeleton)

## Table of Contents

- [React Hasura Demo](#react-hasura-demo)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Plan](#plan)
  - [Features](#features)
    - [Hasura](#hasura)
      - [Initial Setup](#initial-setup)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/charliejacques-NHS/react-hasura-demo.git
   ```

2. Navigate to the project directory:

   ```bash
   cd react-hasura-demo
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

## Usage

Describe how to use your project. Provide examples or code snippets if necessary.

```bash
npm start
# or
yarn start
```

This command starts the development server.

```bash
npm run build
# or
yarn build
```

This command builds the production-ready version of your project.

```bash
docker-compose -f docker-compose.backend.yml up -d
```

This command spins up an instance of Hasura, Postgres and the NodeJS API locally

## Plan

For this project I want to demonstrate certain features of Hasura. To do that I will create a miniature shopping application which displays some products and allows you to add those to a basket and checkout.

The following stuff will be used:

- GraphQL API
  - All data will be fetched from Hasura's GraphQL API (using headers to configure Hasura Session Variables)
- GraphQL Subscriptions
  - The shopping basket will be cached in Hasura using Web sockets to keep the data synced
- Hasura Actions
  - I'll set up a small Node JS microservice which exposes some endpoints
  - This API will only be accessible with an API key (which will be set as an environment variable) so it can't be called directly from the frontend
  - An action will be set up, so the frontend can call the API via GraphQL
- Role Based Access Control
  - This will be governed through table-level permissions in Hasura
  - I'll also set up "feature_flags" to demonstrate changing frontend functionality based on a user's role
- Hasura Session Variables
  - These can be controlled multiple ways
  - We are controlling them through the request headers being sent
- RESTified Endpoints
  - You can turn GraphQL queries into REST endpoints if you need to use REST over GraphQL at any point.

Stuff that's not used but is interesting to know

- Hasura events
  - Set up One-off, scheduled & triggered events through the `Events` tab in the Hasura console
- JWT Authentication
  - Hasura can be set up quite quickly to require JWT authentication. It provides some environment variables that you just need to assign values to e.g. `HASURA_GRAPHQL_JWT_SECRET`
  - We can control the session variables (`x-hasura-role`, `x-hasura-user-id`, `x-hasura-anything-you-like`) through claims in the JWT body. Read about it [here](https://hasura.io/docs/latest/auth/authentication/jwt/)
- Remote Schemas
  - Hasura can be set up to read remote GraphQL schemas, so you can integrate them with your own API and the frontend only ever needs to talk to Hasura
- CI/CD
  - There is a CLI for Hasura that can be used to apply / create database migrations, import / export metadata (so you can store changes to any tables or metadata in version control)
  - Read more [here](https://hasura.io/docs/latest/hasura-cli/overview/)

## Features

This project is written to demonstrate the main functionalities of Hasura including Actions, Permissions, GraphQL API.

### Hasura

#### Initial Setup

I have set up a folder for [Hasura setup help](./hasura_setup). This contains an initial metadata export and db dump to get you started.

I've included the command to start running Hasura and the db in Docker in the [usage](#usage) section. Run this to get all the backend bits online.

This will be created with an initially empty database. So I've included a database dump with all the relevant tables and base data set up for you to get started. You will need to run the following command to seed the database (changing `<your-db-container>` for the name of your container, this can be found by running `docker container list`):

```bash
docker exec -i react-hasura-demo-postgres-1 pg_restore -U postgres -d postgres --clean < ./hasura_setup/hasura_dump.sql
```

Once you have seeded the database and have Hasura up and running locally navigate to the [console](http://localhost:8080/console/settings/metadata-actions) and click `Import Metadata`. Once you import the [metadata file](./hasura_setup/hasura_metadata.json) navigate to the [data tab](http://localhost:8080/console/data/data/schema/public) to see the structure of the tables that have been set up.
