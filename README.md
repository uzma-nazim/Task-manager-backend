# Time took around 10hour


# Task Manager Backend

A RESTful API for managing tasks built with Node.js, Express.js, and MongoDB.

## Features

- MVC architecture with service layer
- RESTful API endpoints
- MongoDB database with Mongoose ODM
- User management with username-based authentication
- Task management with checklist
- JWT-based authentication with access and refresh tokens
- Request validation using Joi

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Joi for validation

## Project Structure

```


## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/task-manager
   NODE_ENV=development
   ACCESS_TOKEN_SECRET=your_access_token_secret_here
   REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
   ```

## Running the Application

### Development Mode
```
npm run dev
```

### Production Mode
```
npm start
```

