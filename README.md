
# Contact Management App

This is a NestJS-based contact management app. Follow the instructions below to run it locally.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 22.x)
- **npm** (Node Package Manager)
- **NestJS CLI** (Install with `npm install -g @nestjs/cli`)

## Setup Instructions

### 1. Clone the Repository

Clone the project to your local machine:

```bash
git clone https://github.com/daleduque/contact-management-be.git
cd contact-management-be
```

### 2. Install Dependencies

Install the required dependencies:

```bash
npm install
```

### 3. Set Up MongoDB

1. Install **MongoDB Compass** from [here](https://www.mongodb.com/try/download/compass).
2. Connect to your local MongoDB server using the connection string: `mongodb://localhost:27017`.

### 4. Create .env File

Create a `.env` file in the project root and add:

```bash
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=secret
```

### 5. Run the Development Server

Start the server with:

```bash
npm run start:dev
```

The app will run at `http://localhost:3000/api/v1`.

## API Endpoints

- **POST** - Create contact: `http://localhost:3000/api/v1/contacts`
- **GET** - Fetch contacts: `http://localhost:3000/api/v1/contacts`
- **PUT** - Update contact: `http://localhost:3000/api/v1/{id}`
- **DELETE** - Delete contact: `http://localhost:3000/api/v1/{id}`
- **POST** - Sign In: `http://localhost:3000/api/v1/auth/signin`
- **POST** - Register: `http://localhost:3000/api/v1/auth/signup`

