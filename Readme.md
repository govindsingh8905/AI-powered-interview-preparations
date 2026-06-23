# Gen AI Project

A Full Stack MERN application integrating AI/GenAI solutions for real-world problems.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Installation and Running](#installation-and-running)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Project Details](#project-details)
- [Author](#author)
- [License](#license)

## Project Overview

Gen AI Project is a comprehensive full-stack application that demonstrates modern web development practices using the MERN stack (MongoDB, Express, React, Node.js) with integrated AI/GenAI capabilities. This project serves as a learning platform and production-ready reference implementation for building scalable web applications.

The project includes authentication mechanisms, real-time features, and AI-powered functionalities that showcase how to integrate artificial intelligence into web applications.

## Tech Stack

### Frontend
- React.js - JavaScript library for building user interfaces
- HTML5 - Markup language
- CSS3 - Styling and responsive design
- Tailwind CSS - Utility-first CSS framework
- JavaScript - Programming language
- npm - Package manager

### Backend
- Node.js - JavaScript runtime environment
- Express.js - Web application framework
- MongoDB - NoSQL database
- MySQL - Relational database
- JWT - JSON Web Tokens for authentication
- JavaScript - Programming language

### Additional Technologies
- Python - For AI/ML integration
- C++ - For performance-critical operations
- Git - Version control
- Postman - API testing tool
- VS Code - Code editor

## Project Structure

```
Gen_Ai_project/
├── Frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   └── ...other components
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   └── ...other pages
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── ...custom hooks
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── ...other contexts
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── ...other services
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles/
│   ├── package.json
│   ├── .env
│   └── README.md
│
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   └── ...other controllers
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Post.js
│   │   │   └── ...other models
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   └── ...other routes
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   └── validationMiddleware.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── emailService.js
│   │   │   ├── aiService.js
│   │   │   └── ...other services
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── environment.js
│   │   ├── utils/
│   │   │   ├── validators.js
│   │   │   └── helpers.js
│   │   └── server.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
└── README.md (this file)
```

## Frontend Setup

### Prerequisites

Ensure you have the following installed on your system:
- Node.js version 14.0 or higher
- npm version 6.0 or higher
- Modern web browser

### Installation Steps

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration file:
```bash
touch .env
```

4. Add environment variables to .env file:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_JWT_SECRET=your_jwt_secret_key
REACT_APP_ENV=development
```

### Frontend Folder Details

Frontend/src/components/ - Reusable React components such as headers, navigation bars, form components, and UI elements used across multiple pages.

Frontend/src/pages/ - Page-level components representing complete pages like Home, Login, Profile, Dashboard pages.

Frontend/src/hooks/ - Custom React hooks for logic reusability including authentication hooks, data fetching hooks, and form handling hooks.

Frontend/src/context/ - Context API setup for global state management including authentication context and user context.

Frontend/src/services/ - API service files that handle communication with the backend including API calls, error handling, and data transformation.

Frontend/src/styles/ - Global CSS files, utility classes, and styling configurations.

### Available Frontend Commands

```bash
npm start
Starts the development server at http://localhost:3000

npm run build
Creates an optimized production build

npm test
Runs the test suite

npm run eject
Exposes configuration (use with caution)
```

## Backend Setup

### Prerequisites

Ensure you have the following installed on your system:
- Node.js version 14.0 or higher
- npm version 6.0 or higher
- MongoDB installed and running locally or MongoDB Atlas account
- MySQL server (optional, if using MySQL instead of MongoDB)

### Installation Steps

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration file:
```bash
touch .env
```

4. Add environment variables to .env file:

For MongoDB:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gen_ai_project
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
```

For MySQL:
```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=gen_ai_project
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
```

### Backend Folder Details

Backend/src/controllers/ - Contains controller functions that handle the business logic for each route. Controllers receive requests and send responses.

Backend/src/models/ - Contains database schema definitions for MongoDB (using Mongoose) or table definitions for MySQL.

Backend/src/routes/ - Defines all API endpoints and maps them to corresponding controller functions.

Backend/src/middleware/ - Contains middleware functions for authentication verification, error handling, request validation, and logging.

Backend/src/services/ - Contains business logic and utility functions including authentication services, email services, and AI integration services.

Backend/src/config/ - Contains configuration files for database connections and environment setup.

Backend/src/utils/ - Contains utility functions for validation, data transformation, and common operations.

### Available Backend Commands

```bash
npm run dev
Starts the development server with hot reload at http://localhost:5000

npm start
Starts the production server

npm test
Runs the test suite
``

## API Documentation

### Base URL
```

### Authentication Endpoints

POST /auth/register
Description: Register a new user
Request Body:
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123"
}
```
Response: User object with JWT token

POST /auth/login
Description: Login an existing user
Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
Response: User object with JWT token

GET /auth/profile
Description: Get authenticated user profile
Headers: Authorization: Bearer <jwt_token>
Response: User profile object

POST /auth/logout
Description: Logout the current user
Headers: Authorization: Bearer <jwt_token>
Response: Success message

### Example API Calls

Using JavaScript Fetch API:
```javascript
// Login example
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
})
.then(response => response.json())
.then(data => console.log('Token:', data.token))
.catch(error => console.error('Error:', error));

// Get profile example
fetch('http://localhost:5000/api/auth/profile', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer <your_jwt_token>',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log('Profile:', data))
.catch(error => console.error('Error:', error));
```

### HTTP Status Codes

200 OK - Request successful
201 Created - Resource created successfully
400 Bad Request - Invalid request parameters
401 Unauthorized - Authentication required or invalid token
403 Forbidden - Access denied
404 Not Found - Resource not found
500 Internal Server Error - Server error

## Features

User Authentication - Secure user registration and login with JWT tokens

REST API Architecture - Well-structured RESTful API endpoints following industry standards

Real-time Features - WebSocket support for real-time data updates and notifications

AI Integration - GenAI capabilities for intelligent features and data processing

Database Support - Flexible database options with MongoDB and MySQL support

Responsive User Interface - Mobile-friendly React frontend with Tailwind CSS

Error Handling and Validation - Comprehensive input validation and error handling

Scalable Architecture - MVC pattern enabling easy maintenance and scalability

User Profile Management - Complete user profile management system

Password Security - Encrypted passwords and secure authentication

## Project Details



### AI Resume Analyzer

An AI-powered tool for analyzing resumes and providing actionable suggestions for improvement. This project demonstrates the integration of Natural Language Processing and Machine Learning concepts with a web application.


