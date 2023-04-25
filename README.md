# [Wordsy](https://wordsy-jc.herokuapp.com/)

Saw a new word that you read somewhere? Look up the definition and add it to Wordsy. Keep track of all your past learnt words, review them, and expand your vocabulary! Try it out on [Wordsy](https://wordsy-jc.herokuapp.com/).

![Wordsy Demo](docs/wordsy-demo.gif)

## Features

* User can register for an account and login to Wordsy
* User can add a word with its definitions and examples
* User can delete, modify, or view details of the word

## Getting Started

You can view a live demo over at https://wordsy-jc.herokuapp.com/.

You'll get a better experience on laptops or desktops with Google Chrome. You can use my test account (**Username**: testtest, **Password**: test) or create your own.

If you're running Wordsy locally, clone this repo and follow the instructions below.

### Prerequisites

1. Install nodemon for development purpose
    ```
    npm install --save-dev nodemon
    ```

2. Add your `MONGO_ATLAS_URI`, `JWT_KEY` to the nodemon.json. Make sure you set environment variables for them if deploying

3. You can set `NODE_ENV` to `development` to output development logs or set it to `production` before deployment

### Installing

1. Install dependencies for server
    ```
    npm install
    ```

2. Install dependencies for client
    ```
    npm run client-install
    ```

3. Run the Express server
    ```
    npm run server
    ```

4. Run the React client server on another terminal
    ```
    npm run client
    ```

Server runs on http://localhost:5000 and client on http://localhost:3000.

## Deployment

Heroku will run the `heroku-postbuild` script so that you do not have to compile your React frontend manually. Simply push to Heroku and it will build and load the client index.html page.

Just remember to set `MONGO_ATLAS_URI`, `JWT_KEY`, and `NODE_ENV` to `production` in Heroku config vars.

## Built With

* [MongoDB](https://www.mongodb.com/) - The backend database
* [Express](https://expressjs.com/) - The web app framework for NodeJS
* [React](https://reactjs.org/) - The web framework used
* [NodeJS](https://nodejs.org/en/) - JavaScript runtime environment

I also used [Redux](https://redux.js.org/) for state management, [Axios](https://github.com/axios/axios) for promise based HTTP client, [JWT](https://jwt.io/) for web tokens, [Bcrypt](https://github.com/dcodeIO/bcrypt.js) for password hashing, [Mongoose](https://mongoosejs.com/) for modeling application data, and other smaller packages.

## Version

1.0.0

## Author

**JAF** - [Jefflol](https://github.com/Jefflol)
