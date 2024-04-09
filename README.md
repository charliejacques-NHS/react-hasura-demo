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
      - [Integrated features](#integrated-features)
        - [GraphQL Queries, Mutations and Subscriptions](#graphql-queries-mutations-and-subscriptions)
        - [Actions](#actions)
        - [Role Based Access Control (Session Variables / Feature Flags)](#role-based-access-control-session-variables--feature-flags)
        - [RESTified Endpoints](#restified-endpoints)

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

In the `.env.example` are all the variables you need to get started, if you just copy this into a `.env` file before doing anything you should be able to just start immediately.

```bash
npm run dev
# or
yarn dev
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
docker exec -i react-hasura-demo-postgres-1 pg_restore -U postgres -d postgres < ./hasura_setup/hasura_dump.sql
```

Once you have seeded the database and have Hasura up and running locally navigate to the [console](http://localhost:8080/console/settings/metadata-actions) and click `Import Metadata`. Once you import the [metadata file](./hasura_setup/hasura_metadata.json) navigate to the [data tab](http://localhost:8080/console/data/data/schema/public) to see the structure of the tables that have been set up.

#### Integrated features

##### GraphQL Queries, Mutations and Subscriptions

In this repository the interaction with the DB is controlled through GraphQL. Read more [here](https://hasura.io/docs/latest/schema/overview/)

GraphQL queries have been set up for fetching products, feature flags and product categories. These queries can be found [here](./src/graphql/queries.ts).
GraphQL mutations have been set up for adding new products, and interactions with the basket. These mutations can be found [here](./src/graphql/mutations.ts).
GraphQL subscriptions have been set up for reading the basket (so it can be cached in the DB). These subscriptions can be found [here](./src/graphql/subscriptions.ts).

##### Actions

Hasura provides a feature called `Actions`. These function as essentially a proxy for calling specified API endpoints. It provides you with a GraphQL function you can call which will fire off the specified API call. Read more [here](https://hasura.io/docs/latest/actions/overview/).

In this repository 2 actions have been set up

- `node_app_health_check`
  - This is only allowed to be called by admin users
  - All this does is poll the `/health` endpoint in the Node application to make sure it's up and running
- `get_user_details`
  - This is only allowed to be called by unauthorized users
  - This is called with a `username` and returns that user's id and role. (I said there was going to be a minimal amount of authentication here!)
  - I have just set this up to demo what is possible. This could be replaced with a `/login` call to run some business logic which checks a username and password etc.

##### Role Based Access Control (Session Variables / Feature Flags)

There are permissions features built in to Hasura to allow control over access to tables / actions for certain roles. Read more [here](https://hasura.io/docs/latest/auth/authorization/index/).

The permissions summary for all of the tables on your local instance can be found [here](http://localhost:8080/console/data/data/schema/public/permissions). This shows what permissions have been allocated for different roles. You can control access to tables down to the row and column. For example, a custom row check has been added to the `users` table for the role `user_base`: `{"id":{"_eq":"X-Hasura-User-Id"}}`. This checks if user being access is the same user that is signed in. `x-hasura-user-id` is a session variable controlled through the request headers (in this project, it can be controlled through JWT claims if JWT auth is set up).

These permissions can be applied to multiple scenarios. For example, I've set up a table for `feature_flags`. This table holds a list of the feature flags for the application, these feature flags control frontend behaviour, it can be for specific logic or changing what gets rendered. If you take a look at the permissions on that table you will notice a relatively complex object:

```json
{
  "_or": [
    {
      "users": {
        "user_id": {
          "_eq": "X-Hasura-User-Id"
        }
      }
    },
    {
      "user_groups": {
        "user_group": {
          "users": {
            "user_id": {
              "_eq": "X-Hasura-User-Id"
            }
          }
        }
      }
    }
  ]
}
```

Basically, we want to add different scopes for feature flags. So I have created 2 tables `user_feature_flags` and `user_group_feature_flags` which will allow us to insert a `feature_flag_id` and `user_id` or `user_group_id`, then set up relationships to the relevant tables. Hasura's permissions also allow us to query the table's relationships. So in the object above we are checking to see if a requested feature flag is associated with the signed in user through the `user_groups` and just the `users` relationships. Currently the only feature flag set up is `List New Products (for Elevated Users)` which we only want to let users with the role `user_elevated` do. So we've added an entry to `user_group_feature_flags` which links the `user_group_id` and `feature_flag_id`. So now when we query the `feature_flags` table as a `user_base` we see nothing returned, but when running the query as `user_elevated` you will see the `list_new_products` feature flag returned.

##### RESTified Endpoints

Hasura allows you to turn GraphQL queries into REST endpoints. Read more [here](https://hasura.io/docs/latest/restified/overview/)

I have set up one REST endpoint, which can be found on your local instance [here](http://localhost:8080/console/api/rest/list)

- `GET_USER_DETAILS`
  - You can see this used in the [Node App](./server.js) on line 56
  - This accepts a url param of `:username` which is transformed into a GraphQL variable by Hasura.
