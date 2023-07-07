# Admin-User-Authentication

# Backend
This project is a backend application built with Node.js, Express.js, bcrypt, MongoDB, JWT, and ESLint. It provides registration and login functionality for both users and admins. Admins have the ability to view the list of all users and delete user accounts.

## Installation and Setup
- Clone the repository from GitHub.
- Install dependencies by running `npm install`.
- Create a `.env` file and add the necessary environment variables 
- Run `npm start` to start the server.

## API Endpoints

`POST /api/user/register`: Register a new user.

`POST /api/user/login`: Login as a user.

`PUT /api/user/:userId`: Update user details.

`POST /api/admin/register`: Register a new admin.

`POST /api/admin/login`: Login as an admin.

`GET /api/admin/users`: Get the list of all users (admin-only).

`DELETE /api/admin/users/:userId`: Delete a user by their ID (admin-only).

# Frontend

This project is a frontend application built with React.js and React Router. It provides a user interface for registration, login, and a dashboard to display a list of users with their name, address, profile picture, and mobile number. The dashboard also allows the admin to delete user accounts.

`npx create-react-app my-app` install the ReactJs code snippets extension.

### Usage
- Register: Visit the registration page (/register) and enter your details to create a new account.

- Login: Visit the login page (/login) and enter your credentials to log in to your account.

- Dashboard: After successful login, you will be redirected to the user list dashboard.

## Swagger documentation

`/api-docs`: view Swagger documentation for the API