# React TypeScript Skeleton Project

This is a skeleton project for quickly setting up a React application with TypeScript, using Vite for build and development, ESLint and Prettier for linting and formatting, SCSS for styling, and Husky for pre-commit hooks.

> There is definitely a lot of personal preference in the way this has been set up. I've come to building web applications this way after a few years of experience working on a variety of different projects (personal and professional).
>
> So personally, I enjoy using HTML elements and actual CSS (SCSS) whilst building applications. It feels like better separation between the styles and JS. When UI libraries force styling to be done through the JSX I find the components start to blow up in size.
>
> I've also added in some recommended VS Code extensions [here](/.vscode/extensions.json) which you can see by going to the Extensions tab and typing `@recommended`. I've found these help improve productivity and help the IDE to work more for you.
>
> If you have any ideas of how to improve this, or you find this repo in useful in any way whatsoever please don't hesitate to get in contact!

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Linting and Formatting](#linting-and-formatting)
  - [Pre-commit Hooks](#pre-commit-hooks)
- [Environment Variables File (.env)](#environment-variables-file-env)
  - [Usage](#usage)
  - [Important Notes](#important-notes)
- [Run The Application](#run-the-application)
  - [Running with `npm / yarn`](#running-with-npm--yarn)
  - [Running with `docker`](#running-with-docker)
  - [Running with `docker-compose`](#running-with-docker-compose)
  - [Stopping and removing containers](#stopping-and-removing-containers)
- [Project Structure](#project-structure)
  - [Tree](#tree)
  - [The `public` Folder](#the-public-folder)
  - [The `docs` Folder](#the-docs-folder)
  - [The `assets` folder](#the-assets-folder)
  - [The `components` folder](#the-components-folder)
  - [The `context` folder](#the-context-folder)
  - [The `hooks` folder](#the-hooks-folder)
  - [The `pages` folder](#the-pages-folder)
  - [The `theme` folder](#the-theme-folder)
  - [The `types` folder](#the-types-folder)
  - [The `util` folder](#the-util-folder)
- [Internationalization](#internationalization)
  - [Benefits](#benefits)
  - [Updating Translations](#updating-translations)
- [Styling](#styling)
  - [Borders](#borders)
  - [Breakpoints](#breakpoints)
  - [Colors](#colors)
  - [Dimensions](#dimensions)
  - [Fonts](#fonts)
  - [Mixins](#mixins)
  - [Z Index](#z-index)
- [Deployment](#deployment)
  - [Deployment Options](#deployment-options)
    - [1. Manual Deployment](#1-manual-deployment)
      - [Steps](#steps)
    - [2. Platform as a Service (PaaS)](#2-platform-as-a-service-paas)
      - [Example: Netlify](#example-netlify)
      - [Example: Vercel](#example-vercel)
      - [Example: Render](#example-render)
    - [3. Containerization and Orchestration](#3-containerization-and-orchestration)
      - [Example: Kubernetes](#example-kubernetes)
  - [Continuous Deployment](#continuous-deployment)
    - [Example: GitHub Actions](#example-github-actions)
  - [Monitoring and Maintenance](#monitoring-and-maintenance)
- [Extras you can add](#extras-you-can-add)
  - [State Management](#state-management)
    - [Redux](#redux)
    - [Zustand](#zustand)
  - [Documentation](#documentation)
    - [Storybook](#storybook)
    - [React Styleguidist](#react-styleguidist)
  - [Testing](#testing)
    - [Cypress](#cypress)
    - [Jest](#jest)
    - [ViTest](#vitest)
    - [Testing Library - React](#testing-library---react)
  - [Mobile Application Development](#mobile-application-development)
    - [CapacitorJS](#capacitorjs)
    - [Ionic](#ionic)

## Features

- **React**: A JavaScript library for building user interfaces.
- **React Router DOM**: A React library for building Single Page Applications.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A build tool that provides a fast and optimized development experience.
- **ESLint**: A pluggable linting utility for JavaScript and JSX.
- **Prettier**: An opinionated code formatter.
- **SCSS**: A preprocessor scripting language that is interpreted or compiled into CSS.
- **Husky**: A tool to set up Git hooks.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your machine.

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/your-project.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-project
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

### Linting and Formatting

- To run ESLint:

  ```bash
  npm run lint
  # or
  yarn lint
  ```

  This will run ESLint and report any linting errors or warnings in your codebase.

- To run Prettier:

  ```bash
  npm run format
  # or
  yarn format
  ```

  This will format your codebase according to Prettier rules.

### Pre-commit Hooks

This project uses Husky to run linting and formatting checks before every commit. This ensures that your codebase stays consistent and free from linting errors.

## Environment Variables File (.env)

The `.env` file is used to define environment variables for your Vite-powered React application. These variables can be accessed within your application code and are often used to configure different aspects of your application based on the environment it's running in.

### Usage

1. **Creating the file**: Create a file named `.env` in the root directory of your Vite-powered React project.

2. **Defining environment variables**: Each line in the `.env` file should contain a single environment variable in the `KEY=VALUE` format. For example:

   ```dotenv
   # Environment variables for the Vite-powered React application

   # API URL
   VITE_API_URL=https://api.example.com

   # Environment-specific configuration
   MODE=production
   ```

   - `VITE_API_URL`: This variable specifies the URL of the API that your Vite-powered React application will communicate with. Replace `https://api.example.com` with the actual API URL.

   - `MODE`: This variable specifies the environment in which the React application is running. Setting it to `production` indicates that the application is running in a production environment.

3. **Accessing environment variables**: In your Vite-powered React application code, you can access these environment variables using `import.meta.env`. For example:

   ```javascript
   const apiUrl = import.meta.env.VITE_API_URL;
   const nodeEnv = import.meta.env.NODE_ENV;
   ```

   These variables can then be used to configure your application behavior, such as making API requests or enabling/disabling certain features based on the environment.

### Important Notes

- **Variable naming conventions**: It's common practice to prefix environment variables used in a Vite-powered React application with `VITE_`. This helps differentiate them from other environment variables and ensures they are accessible through `import.meta.env`.

- **Sensitive information**: Avoid storing sensitive information, such as API keys or passwords, directly in the `.env` file. Instead, consider using a secure method for managing sensitive data, such as environment-specific secrets management solutions or environment variables provided at runtime.

- **Gitignore**: Ensure that the `.env` file is added to your `.gitignore` file to prevent it from being committed to version control. This helps avoid exposing sensitive information and ensures that environment variables remain local to each developer's environment.

## Run The Application

### Running with `npm / yarn`

- To start the development server:

  ```bash
  npm run dev
  # or
  yarn dev
  ```

  This will start the development server and open your default web browser with the application running. The development server automatically reloads the browser when you make changes to the source code.

- To build for production:

  ```bash
  npm run build
  # or
  yarn build
  ```

  This will generate a production-ready build of your application in the `dist` directory.

### Running with `docker`

1. **Build the Docker image**: Navigate to the directory containing your Dockerfile in your terminal, then run the following command to build the Docker image:

   ```bash
   docker build -t my-react-app .
   ```

   Replace `my-react-app` with the desired name for your Docker image.

2. **Run the Docker container**: After successfully building the Docker image, you can run a container based on this image using the following command:

   ```bash
   docker run -d -p 8080:80 my-react-app
   ```

   This command starts a container in detached mode (`-d`) and forwards port 8080 on your local machine to port 80 inside the container.

### Running with `docker-compose`

1. **Prepare the Docker Compose file**: Create a file named `docker-compose.yml` in your project directory and copy the provided Docker Compose configuration into this file.

2. **Set environment variables (optional)**: If you have any environment variables defined in your Docker Compose file, make sure to replace them with the appropriate values.

3. **Run Docker Compose**: In your terminal, navigate to the directory containing your `docker-compose.yml` file and run the following command:

   ```bash
   docker-compose up -d
   ```

   This command starts the services defined in your Docker Compose file in detached mode (`-d`), meaning they run in the background.

4. **Access your React application**: Once the Docker containers are running, you can access your React application in a web browser by navigating to the specified hostname or IP address. If you defined a custom hostname in the Traefik labels (e.g., `example.com`), make sure to set up DNS or hosts file entries accordingly.

### Stopping and removing containers

To stop and remove the containers created by Docker or Docker Compose, you can use the following commands:

- **Docker**: Use the `docker stop` command followed by the container ID or name to stop a container, and `docker rm` to remove it.
- **Docker Compose**: In the directory containing your `docker-compose.yml` file, run `docker-compose down` to stop and remove the containers created by Docker Compose.

That's it! You should now be able to run your React application using either the Dockerfile or Docker Compose files provided. Let me know if you have any further questions!

## Project Structure

A basic structure has been set up. The idea generally follows that each folder in `src/` should have a `index` file to export all the contents of the folder from. This makes importing multiple things in one file a lot cleaner.

Typescript path aliasing has also been set up in the [tsconfig file](./tsconfig.json). At the moment it's just set to `@app/*` which means all files within `src` can be imported using `@app/${PATH}`. This reduces the amount of relative (`'../../'`) imports and looks cleaner.

### Tree

```text
.
├── public
│   └── vite.svg
├── docs
│   ├── changelog.example.md
│   └── README.example.md
├─── src
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   └── index.ts
│   ├── context
│   │   └── index.ts
│   ├── hooks
│   │   ├── index.ts
│   ├── pages
│   │   └── index.ts
│   ├── theme
│   │   └── index.scss
│   ├── types
│   │   └── index.ts
│   ├── util
│   │   └── config.ts
│   ├── index.scss
│   ├── main.tsx
│   └── vite-env.d.ts
├── README.md
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### The `public` Folder

This is the `public` folder supplied by Vite. See the docs [here](https://vitejs.dev/guide/assets) for its benefits.

Generally it's used for storing static assets which you want accessible via URL. For example, you can access the file `public/vite.svg` at `http://localhost:5173/vite.svg`

### The `docs` Folder

This is a folder for documentation around the project to go into. Included here are example `README.md` and `changelog.md` files.

### The `assets` folder

This is another place to store static assets, usually only assets you import in the code itself. This can be translation files, fonts, anything. It's just not accessible via URL if you store it in this folder

### The `components` folder

This is a folder to store all of your components in. Components are building blocks for pages. They should be separated out and set up for reusability.

### The `context` folder

This is a folder to store React Context definitions. In the `index.ts` here we also export something extra:

```ts
export const useSiteSettingsContext = () => useContext(SiteSettingsContext);
```

When using a context in React code you will need to import the function `useContext`. That means you'll need to import 2 things in your component file for just 1 context. So here we are aliasing the function and exporting `useSiteSettingsContext` as a custom hook so you only ever need 1 import (in your component code) when using a React Context.

### The `hooks` folder

This is the folder that contains custom hooks for the application.

### The `pages` folder

This is where we store the files for pages. Each new page should have its own directory in this folder.

### The `theme` folder

This is where the SCSS files are stored for the global theming config. Read more in [Styling](#styling)

### The `types` folder

This is where custom TypeScript types are stored. You can structure this folder however you like. For example, if you have a load of types relating to a database it could be good to create a `types/DB` folder to export all your types from.

### The `util` folder

This is a folder where you can store random helper functions that are used in multiple places throughout the app / config for the application. Anything you want really that's not particularly related to React and is more around config or just base TypeScript code.

## Internationalization

React i18n is a powerful internationalization framework for React applications. It allows developers to easily add multilingual support to their projects, making it possible to create applications that can be used by people from different language backgrounds.

### Benefits

1. **Multilingual Support**: With React i18n, developers can provide translations for different languages, allowing users to interact with the application in their preferred language.

2. **User Experience**: By providing content in the user's preferred language, React i18n enhances the user experience, making the application more accessible and user-friendly.

3. **Scalability**: React i18n scales with the application, making it easy to add new languages and update translations as the project evolves.

4. **Community Support**: React i18n has a large and active community, providing resources, tutorials, and support to help developers implement internationalization in their projects.

### Updating Translations

To update translations in the application, follow these steps:

1. **Locate the Translation File**: The master translation file is located at `src/assets/translations/translations.csv`.

2. **Edit the Translations**: Open the `translations.csv` file using a text editor or spreadsheet software. This file contains translation keys and their corresponding translations for different languages.

3. **Update Translations**: Locate the translation key and update the corresponding translation for each language as needed.

4. **Save the Changes**: Once the translations are updated, save the changes to the `translations.csv` file.

5. **Generate JSON Files**: After updating the `translations.csv` file, run the following command in your terminal to generate individual locale JSON files:

   ```bash
   npm run create-json-translations
   ```

   This command will generate JSON files for each locale based on the data in the `translations.csv` file.

6. **Refresh the Application**: After generating the JSON files, refresh the application or rebuild it to see the changes reflected in the user interface.

## Styling

Certain styling variables and helpers have been set up. The general approach to styling in this repo is making everything as customizable as possible. We want to use CSS variables to dictate the styles of our UI components to make it a lot simpler to write custom themes for.

The difference between SCSS and CSS variables is that CSS ones can change at runtime. This means that we can dynamically import a CSS file in our `./src/main.tsx` and change the theme of the entire UI (if we have our variables set up correctly).

For example. In the pre-written [Button component's CSS file](./src/components/Button/Button.module.scss) you should see an example of this. Some variables have been declared, such as `--button-color`, `--button-background-color--disabled` and `--button-border-width`. These can all be overridden anywhere within the app or from an imported CSS file.

```css
/* ./src/assets/my-custom-theme.css */

--button-color: var(--red);
--button-background-color: transparent;
```

```ts
// ./src/main.tsx
import('@app/assets/my-custom-theme.css').then(() =>
  console.log('Custom CSS theme loaded!'),
);
```

All variables exported from the `./src/theme` folder have been exported at the `:root` level which means all of them should be accessible from anywhere within the application (they should also apply to your custom theme files as well, so for example you can use the color variables in your custom CSS themes).

In this repository certain things have already been set up. A lot of these are just for maintaining consistency of styling across UI components.

### Borders

The file `src/theme/_breakpoints.scss` exports default values for border widths and radii

### Breakpoints

The file `src/theme/_breakpoints.scss` exports the pixel values of certain web breakpoints to aid with responsive design.

These values are:

```text
mobile-sm = 320px
mobile-lg = 480px
tablet = 768px
desktop-sm = 1024px
desktop-lg = 1200px
```

### Colors

The file `src/theme/_colors.scss` exports a few colors already. This is just a demonstration of exporting certain colors as SCSS and CSS variables

### Dimensions

The file `src/theme/_dimensions.scss` exports "gutter" values. These are intended to be used for margin / padding values. Setting these up as defined variables helps keep the spacing consistent across UI components.

### Fonts

Instead of introducing invasive `<Typography />` components there are just some recommended variables exported. These include size variations for `font-weight`, `font-size` and `line-height`. There is also a `--font-family-main` variable exported (which can be easily overwritten).

### Mixins

Here there are some generic functions which could be of use when writing any SCSS code in this repo. Feel free to add any more that you need to. All you need to do to use them is:

```scss
// ./src/components/MyComponent/MyComponent.scss`
@import '../../theme';

.container {
  @include row;
}
```

### Z Index

The file `src/theme/_z-index.scss` exports some initial `z-index` values. These can be helpful when trying to build up layers in the UI. Currently, there are exported variables for the already set up `Modal` component.

## Deployment

Deploying a React application involves building the application and serving the built assets using a web server. This guide outlines the steps to deploy a React application to various platforms.

### Deployment Options

#### 1. Manual Deployment

##### Steps

1. **Build the React Application**: In your terminal, navigate to the root directory of your React application and run the following command to build the application:

   ```bash
   npm run build
   ```

2. **Serve the Built Assets**: After the build process completes, the built assets will be available in the `build` directory. You can serve these assets using any web server of your choice (e.g., Nginx, Apache).

#### 2. Platform as a Service (PaaS)

Deploying to a Platform as a Service (PaaS) provider simplifies the deployment process by managing infrastructure for you.

##### Example: Netlify

1. **Build and Deploy with Netlify**: Sign up for a [Netlify](https://www.netlify.com/) account, and connect your Git repository. Netlify automatically detects changes in your repository and builds and deploys your React application.

##### Example: Vercel

1. **Deploy with Vercel**: Vercel provides a platform for static and serverless deployments. Sign up for a [Vercel](https://vercel.com/) account, connect your Git repository, and follow the deployment steps in the Vercel dashboard.

##### Example: Render

1. **Deploy with Render**: Render offers a modern cloud platform for deploying and scaling web applications and services. Sign up for a [Render](https://render.com/) account, connect your Git repository, and use Render's simple configuration to deploy your React application.

#### 3. Containerization and Orchestration

Containerizing your React application with Docker and deploying it with container orchestration tools like Kubernetes or Docker Swarm provides scalability and flexibility.

##### Example: Kubernetes

1. **Containerize the Application**: Write a Dockerfile to containerize your React application. Build the Docker image and push it to a container registry.

2. **Deploy to Kubernetes**: Create Kubernetes manifests (Deployment, Service) to deploy your application. Apply the manifests to your Kubernetes cluster.

### Continuous Deployment

Automating the deployment process with continuous deployment (CI/CD) pipelines ensures that changes are deployed quickly and reliably.

#### Example: GitHub Actions

1. **Configure CI/CD Pipeline**: Set up a CI/CD pipeline using GitHub Actions or any other CI/CD service. Define workflows to build and deploy your React application automatically when changes are pushed to the repository.

### Monitoring and Maintenance

After deploying your React application, monitor its performance and address any issues that arise. Regularly update dependencies and configurations to ensure security and stability.

## Extras you can add

### State Management

Controlling global state can come down to personal preference. React provides its [Context API](https://react.dev/reference/react/createContext) which you can use for global state management, but there are other options. Just keep in mind, if you pick one solution, it's best to stick with that throughout the entire application for consistency.

#### Redux

Redux is a powerful state management tool for React applications, offering a centralized store to manage application state in a predictable and scalable way. With Redux, developers can easily track changes to the state, debug applications using time-travel debugging, and handle complex state logic efficiently. To get started with Redux, check out the official documentation [here](https://react-redux.js.org/introduction/getting-started) for comprehensive guides, examples, and API references.

#### Zustand

Zustand is a lightweight state management library for React that provides a simple and flexible API to manage state in functional components. It allows you to create stores with minimal boilerplate and easily access state and actions using React hooks. Zustand promotes a more functional and concise approach to state management, making it ideal for small to medium-sized applications or as an alternative to more complex solutions like Redux. To learn more about Zustand and how to integrate it into your React projects, refer to the official documentation [here](https://github.com/pmndrs/zustand).

### Documentation

#### Storybook

Storybook is an open-source tool for developing UI components in isolation for React, Vue, Angular, and other modern web frameworks. It allows developers to build and showcase UI components in an interactive development environment, enabling rapid iteration and testing. With Storybook, you can create stories to showcase individual components with different states and props, making it easier to develop, test, and document UI components in isolation. To learn more about Storybook and how to use it in your React projects, check out the official documentation [here](https://storybook.js.org/).

#### React Styleguidist

React Styleguidist is a component development environment for React and React Native applications. It helps developers build living style guides and documentation directly from their React components. With React Styleguidist, you can showcase components with different props, states, and variations, making it easy to understand how they behave in different scenarios. It also provides features like hot reloading, automatic component documentation generation, and integration with popular tools like Jest and TypeScript. To learn more about React Styleguidist and how to integrate it into your React projects, check out the official documentation [here](https://react-styleguidist.js.org/).

### Testing

#### Cypress

Cypress is a next-generation front-end testing tool built for the modern web. It provides a powerful yet simple API to write end-to-end tests for web applications. With Cypress, you can write tests that run directly in the browser, allowing you to see exactly what's happening at each step of your test suite. It offers features like automatic waiting, real-time reloading, and robust debugging tools, making it easy to write and maintain reliable tests. Cypress is designed to work seamlessly with modern JavaScript frameworks like React, Angular, and Vue. To learn more about Cypress and how to get started with testing your React applications, check out the official documentation [here](https://docs.cypress.io/).

#### Jest

Jest is a delightful JavaScript testing framework for React applications. It provides a zero-configuration experience out of the box and focuses on simplicity and speed. With Jest, you can write tests using familiar syntax, such as `describe` and `it`, and assertions with `expect`. It offers features like snapshot testing, mocking, and parallel test execution, making it easy to write and maintain robust test suites. Jest integrates seamlessly with popular tools like React Testing Library and Enzyme, and it's widely adopted in the React community. To learn more about Jest and how to write tests for your React applications, check out the official documentation [here](https://jestjs.io/).

#### ViTest

Vitest is a lightweight and fast test runner primarily designed for testing Vue.js applications. It provides a simple and intuitive API for writing and running tests for Vue components, Vuex stores, and other Vue-related entities. Vitest aims to offer a seamless testing experience with minimal configuration and setup, allowing developers to focus on writing meaningful tests for their Vue applications. While it's primarily tailored for Vue.js, it can also be used for testing React applications or other JavaScript projects. To learn more about Vitest and how to use it for testing Vue.js applications, check out the official documentation [here](https://vitest.dev/).

#### Testing Library - React

`@testing-library/react` is a popular testing utility for React applications. It provides a set of utilities to write tests that focus on the behavior of your components from the user's perspective. This library encourages writing tests that closely resemble how your components are used by real users, promoting better testing practices and more robust code. `@testing-library/react` works well with other testing frameworks like Jest and allows you to query elements using semantic queries similar to how users interact with your application. To learn more about `@testing-library/react` and how to use it for testing your React components, check out the official documentation [here](https://testing-library.com/docs/react-testing-library/intro/).

### Mobile Application Development

#### CapacitorJS

Capacitor is a cross-platform app runtime that makes it easy to build web apps that run natively on iOS, Android, and the web. It enables developers to build high-quality mobile apps using web technologies like HTML, CSS, and JavaScript, while still having access to native functionality and APIs. Capacitor provides a consistent API for accessing device features, such as the camera, file system, and geolocation, across different platforms. It's particularly well-suited for developers who are familiar with web development and want to leverage their existing skills to build mobile apps. To learn more about Capacitor and how to get started building mobile apps with it, check out the official documentation [here](https://capacitorjs.com/docs).

#### Ionic

Ionic is a popular open-source framework for building cross-platform mobile and web applications using web technologies like HTML, CSS, and JavaScript/TypeScript. It provides a comprehensive set of UI components, gestures, and tools that enable developers to create high-quality and interactive mobile apps. Ionic offers a rich ecosystem of plugins and integrations with other frameworks like Angular, React, and Vue.js, allowing developers to leverage their existing skills and libraries. With Ionic, developers can build apps that run natively on iOS, Android, and the web with a single codebase, streamlining the development process and reducing time to market. To learn more about Ionic and how to get started building mobile apps with it, check out the official documentation [here](https://ionicframework.com/docs).
