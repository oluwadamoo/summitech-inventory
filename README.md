# Inventory Api

### Introduction

Backend api to allow organizations to manage a simple inventory (products or service)

### Inventory Api Features

- Users can signup and login to their accounts
- Logged in user can add/update products
- Logged in user can add/update stocks using the product id
- Users can get all products and get a single product by its product id
- Users can get all stocks and get a single stock by its batch id

### Installation Guide

- Clone this repository [here](https://github.com/oluwadamoo/summitech-inventory)
- Run **npm install** to install all dependencies
- Create an .env file in your project root folder and add your variables. see .env.example for assistance.

### Usage

- Run **yarn start:dev** to start the application.
- Connect to the API using Postman on the specified port in the .env file.

### API Documentation

- Access Api documentation [here](https://documenter.getpostman.com/view/11729281/2s935kN5fD)

### API Endpoints

| HTTP Verbs | Endpoints                 | Action                            |
| ---------- | ------------------------- | --------------------------------- |
| POST       | /api/users/signup         | To sign up a new user account     |
| POST       | /api/users/sigin          | To login an existing user account |
| POST       | /api/users/sigout         | To logout a logged in user        |
| GET        | /api/users/currentuser    | To get the current loggedin user  |
| POST       | /api/products/            | To add a new product              |
| PATCH      | /api/products/:product_id | To update a product               |
| GET        | /api/products             | To get all products               |
| GET        | /api/products/:product_id | To get product by id              |
| POST       | /api/stocks               | To add a new stock                |
| PATCH      | /api/stocks/:batch_id     | To update a stock                 |
| GET        | /api/stocks               | To get all stocks                 |
| GET        | /api/stocks/:batch_id     | To get stock by batch id          |

### Technologies Used

- [NodeJs](https://nodejs.org/)
- [ExpressJs](https://expressjs.com/)
- [Mysql](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)
- [Typescript](https://www.typescriptlang.org/)

### Author

- [Damilola Saliu](https://github.com/oluwadamoo)
