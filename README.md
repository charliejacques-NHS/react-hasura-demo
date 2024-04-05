# React Hasura Demo

This project is written to demonstrate the main functionalities of Hasura including Actions, Permissions, GraphQL API.

This project has been created from my own [React TS template](https://github.com/CharlieJ213/react-ts-skeleton)

## Table of Contents

- [React Hasura Demo](#react-hasura-demo)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
    - [Hasura](#hasura)
      - [Inital Metadata](#inital-metadata)

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
docker-compose -f docker-compose.hasura.yml up -d
```

This command spins up an instance of Hasura locally

## Features

This project is written to demonstrate the main functionalities of Hasura including Actions, Permissions, GraphQL API.

### Hasura

#### Inital Metadata

I have set up a folder for [Hasura Metadata](./hasura_metadata). This contains an initial metadata export to get you started.

Once you have Hasura up and running locally navigate to the [console](http://localhost:8080/console/settings/metadata-actions) and click `Import Metadata`. Once you import the metadata file navigate to the [data tab](http://localhost:8080/console/data/data/schema/public) to see the structure of the tables that have been set up.
