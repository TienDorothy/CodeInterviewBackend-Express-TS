# Problem 5: A Crude Server

This project implements a basic CRUD API using ExpressJS and TypeScript, connected to MongoDB for data persistence.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (version 12 or higher)
- npm 
- TypeScript (ensure TypeScript is installed globally)
- MongoDB (ensure created account and running)

## Installation

1. Clone the repository:

```bash
git clone <repository_url>
```

2. Install dependencies:

```bash
npm install
```

## Configuration

Ensure to configure your MongoDB connection in a .env file

Example .env file:

```dotenv
DB_URL=mongodb+srv://your_username:your_password@nodejslab.4npjxgu.mongodb.net/your_database_name
PORT=3000
```

## Running the Application

To start the server in development mode:

```bash
npm start
```

## API Endpoints

- POST /api/users: Create a new resource.
- GET /api/users: List all resources with optional filters.
  - Query Parameters:
    - `username`: Filter by username (exact match).
    - `age`: Filter by age (supports operators like `lt`, `lte`, `gt`, `gte`).
    - `createdAt`: Filter by creation date (exact match).
    - `updatedAt`: Filter by update date (exact match).
    - `sort_by`: Sort results by fields (prefix with `-` for descending order).
    - `page`: Page number for pagination (default: 1).
    - `limit`: Number of items per page (default: 10).
  - Example: `/api/users?username=Tien&age=lte:19&createdAt=2024-07-14&sort_by=-username,-createdAt&page=1&limit=10`
- GET /api/users/:id: Get details of a specific resource.
- PUT /api/users/:id: Update details of a specific resource.
- DELETE /api/users/:id: Delete a specific resource.

## Project Structure

```graphql
root/
├── src/
│   ├── controllers/
│   │   └── user.controller.ts 
│   ├── models/
│   │   └── user.model.ts     
│   ├── routes/
│   │   └── user.route.ts 
│   ├── index.ts            
├── .env                
├── .gitignore               
├── nodemon.json                
├── package-lock.json            
├── package.json             
└── README.md                      
└── tsconfig.json                      

```

## Development Tools

TypeScript for type-safe development.
ExpressJS for handling HTTP requests.
MongoDB for data persistence.
