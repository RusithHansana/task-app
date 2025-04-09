# Task Manager Application Documentation

## Overview

Task Manager is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to create, manage, and track their tasks. The application includes user authentication, profile management, and a comprehensive task tracking system.

## Tech Stack

### Frontend

- **React 19** - UI library
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **TailwindCSS** - Styling
- **React Router** - Routing
- **Lucide React** - Icon library
- **Vite** - Build tool

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt.js** - Password hashing
- **Express Validator** - Input validation
- **Express Rate Limiter** - API rate limiting
- **Cookie Parser** - Cookie handling

## Project Structure

```bash
task-app/
├── client/                  # Frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── features/        # Redux slices and API definitions
│   │   ├── layout/          # Layout components
│   │   ├── pages/           # Page components
│   │   └── main.jsx         # Application entry point
│   └── ...
└── server/                  # Backend application
    ├── config/              # Configuration files
    ├── controllers/         # Request handlers
    ├── middleware/          # Express middleware
    ├── models/              # Mongoose models
    ├── routes/              # API routes
    ├── seed/                # Database seeding
    └── server.js            # Server entry point
```

## Features

### Authentication

- User registration
- User login
- Protected routes
- JWT authentication with HTTP-only cookies

### Task Management

- Create new tasks
- View all tasks
- Update task details
- Mark tasks as completed
- Delete tasks
- Task statistics (total, completed, pending)

### User Management

- View user profile
- Update user information

## API Endpoints

### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Tasks

- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### User

- `PUT /api/users/update/:id` - Update user information

## Data Models

### User Model

```javascript
{
  name: String,
  email: String,
  password: String (hashed)
}
```

### Task Model

```javascript
{
  user: ObjectId,
  title: String,
  description: String (optional),
  completed: Boolean,
  timestamps: {
    createdAt: Date,
    updatedAt: Date
  }
}
```

## Security Features

- Password hashing with bcrypt
- JWT authentication
- HTTP-only cookies
- API rate limiting
- Input validation with express-validator

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository

```bash
git clone https://github.com/rusithhansana/task-app.git
cd task-app
```

2. Install dependencies

```bash
npm install
cd client
npm install
```

3. Configure environment variables

Create a `.env` file in the root directory with the following variables:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskapp
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

4. Run the application

```bash
# Development mode (runs both client and server)
npm run dev

# Run server only
npm run server

# Run client only
npm run client

# Seed the database
npm run seed

# Remove seed data
npm run seed:destroy
```

## Development Notes

### State Management

The application uses Redux Toolkit for state management with RTK Query for API calls. The authentication state is persisted in local storage using a custom middleware.

### Middleware

- `authMiddleware.js` - Protects routes and verifies JWT tokens
- `rateLimiter.js` - Limits API requests to prevent abuse
- `localStorageMiddleware.js` - Persists authentication state

### Error Handling

The application implements comprehensive error handling on both the frontend and backend:

- Form validation errors
- API response errors
- Authentication errors
- Database errors

### Future Enhancements

- Task categories/tags
- Task priority levels
- Due dates for tasks
- User avatar/profile picture
- Social authentication (Google, GitHub)
- Team collaboration features
- Email notifications

## Troubleshooting

### Common Issues

1. **Connection to MongoDB fails**: Check that MongoDB is running and the URI is correct.
2. **JWT authentication fails**: Ensure the JWT_SECRET is properly set in the .env file.
3. **CORS errors**: Verify that the FRONTEND_URL in the .env file matches your frontend URL.

## Contributors

- Rusith Hansana - Developer
  