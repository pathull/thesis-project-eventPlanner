# Event Planner App

<p align="center">
  <img src="https://user-images.githubusercontent.com/66889974/206880794-7a0409c2-dafb-4967-8e57-c0784a2d9f89.png" />
</p>

Event Planner App is a platform where you can create events that you can manage and organize so your event is successful. Also you can manage the events where you were invited to participate. To make a better communication experience among the members of an event, there is a chat that was built to share important information and have fun.

## Screenshots

<p align="center">
  <img src="https://user-images.githubusercontent.com/66889974/206881471-760f09c3-06ad-4027-8e30-52b785e217c9.png" />

  <img src="https://user-images.githubusercontent.com/66889974/206881579-a1889184-5e66-474b-9174-5b3d4eed9b36.png" />

  <img src="https://user-images.githubusercontent.com/66889974/206881633-3ec3a2a9-3750-4703-af10-4743b99ff864.png" />
</p>

## Getting started
1. Clone the repo
```shell
git clone https://github.com/GustavoSilvaNavarro/thesis-project-eventPlanner
cd thesis-project-eventPlanner
```

2. Run command to install dependencies backend and frontend
```shell
npm install
```

### Backend
1. Server is using SQL database, You should create a database with the name of your preferences and create a .env file with the following keys
```js
// SERVER APPLICATION
PORT_PROD=8080

// DB connection to SQL
DB_SQL_HOST= //example 127.0.0.1
DB_SQL_USERNAME=  //example root
DB_SQL_PORT=  //example 3306
DB_SQL_PASSWORD= // user's password
DB_SQL_DATABASENAME=  //database name
DB_SQL_DIALECT=  //example mysql

// CLOUDINARY KEYS info provided by cloudinary | https://console.cloudinary.com/users/login#gsc.tab=0
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_PUBLIC_KEY=
CLOUDINARY_SECRET_KEY=

// Client domain
CLIENT_DOMAIN_URL= //example http://localhost:3000
```

2. Run development server
```shell
npm run start:dev
```

### Frontend
1. Create a .env file with the following keys
```js
// Auth0 KEYS for client side | https://auth0.com/docs/quickstart/backend/nodejs/interactive
REACT_APP_AUTH0_DOMAIN=
REACT_APP_AUTH0_CLIENT_ID=

// Server details
REACT_APP_BASE_URL= // server url
```
2. Run react in developer mode
```shell
npm start
```

## Built with
### Backend
* [Express](https://expressjs.com/) - Express is a minimal and flexible Node.js web application framework
* [NodeJs](https://nodejs.org/en/) - An open-source, cross-platform JavaScript runtime environment.
* [Sequelize](https://sequelize.org/) - ORM for SQL Databases
* [MariaDB](https://mariadb.org/) / [PostgresSQL](https://www.postgresql.org/) - SQL Database
* [Socket io](https://socket.io/docs/v4/server-api/) - Bidirectional and low-latency communication for every platform.
* [Cloudinary](https://console.cloudinary.com) - Media Library that allows to store media.
* [Typescript](https://www.typescriptlang.org/) - TypeScript is a strongly typed programming language that builds on JavaScript.

### Frontend
* [React](https://reactjs.org/) - Front end library for building user interfaces.
* [FilePond](https://pqina.nl/filepond/) - A JavaScript library that can upload anything you throw at it.
* [Auth0](https://auth0.com/) - Service for authentication and authorization.
* [Tailwindcss](https://tailwindcss.com/) - CSS Framework to style applications.
* [Socket io client](https://socket.io/docs/v4/client-api/) - Bidirectional and low-latency communication for every platform.
* [Typescript](https://www.typescriptlang.org/) - TypeScript is a strongly typed programming language that builds on JavaScript.

## Author
* Gustavo Silva Navarro - [GitHub](https://github.com/GustavoSilvaNavarro) - [Linkedin](https://www.linkedin.com/in/gustavo-silva-navarro/)
* Patrick Hull - [GitHub](https://github.com/pathull) - [Linkedin](https://www.linkedin.com/in/patrick-hull-869a07a4)
* James Warnsby - [GitHub](https://github.com/jwarnsby) - [Linkedin](https://www.linkedin.com/in/jameswarnsby)
