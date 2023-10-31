# Full Stack React Native Todo App

This is a full-stack todo application built using React Native for the frontend, Express.js for the backend, and various technologies. It allows users to create, view, update, and delete todos, as well as handle user authentication.

## Frontend Technologies

- React Native
- Expo
- Nativewind (TailwindCSS)
- Expo Router
- React Form
- Tanstack React Query

## Backend Technologies

- Express.js
- Prisma ORM
- Node.js
- MongoDB

## Features

### Frontend

- User authentication (Login, Logout, SignUp)
- Create, read, update, and delete todos
- Fetch and display Todos

### Backend

#### Authentication Routes

- `POST /login` - Log in a user
- `POST /logout` - Log out a user
- `POST /signup` - Register a new user

#### Todo Routes

- `GET /todo` - Get all todos
- `POST /todo` - Create a new todo
- `PUT /todo/:id` - Update a todo by ID
- `DELETE /todo/:id` - Delete a todo by ID

#### User Routes

- `GET /user` - Get user information

## Installation

### Frontend

1. Navigate to the frontend directory.
2. Run `npm install` to install dependencies.
3. Open CMD write `ipconfig` get the IPv4
4. Place IPv4 in utils/axios in `baseURL`
5. Run the app using `npm run start`.
6. Scan QR Code using `EXPO GO` application.

### Backend

1. Navigate to the backend directory.
2. Run `npm install` to install dependencies.
3. Configure the database connection in `.env` and `prisma/schema.prisma`.
4. Run the backend using `npm run dev`.




