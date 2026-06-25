# EaseWallet

EaseWallet is a secure digital vault application that allows users to store and manage notes, images, and documents in a structured and organized way.

## Features

### Authentication

* User Registration
* User Login
* Protected Routes
* Role-Based Access (User/Admin)

### Dashboard

* Overview of stored content
* Total Notes Counter
* Total Images Counter
* Total Documents Counter

### Vault Management

* Store Notes
* Store Images
* Store Documents
* Categorize Content
* Secure Digital Storage

### Profile Management

* User Profile Page
* Account Information
* Logout Functionality

## Tech Stack

### Frontend

* React
* TypeScript
* React Router
* Tailwind CSS
* Context API

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

### Authentication

* JWT (In Progress)
* bcryptjs (In Progress)

## Project Structure

```text
src
│
├── components
│   └── layout-ui
│
├── context
│
├── hooks
│
├── layouts
│
├── pages
│   ├── auth
│   ├── app
│   └── admin
│
├── routes
│
├── services
│
├── types
│
└── utils
```

## Backend Structure

```text
backend
│
├── src
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   └── server.js
│
├── .env
└── package.json
```

## Installation

### Clone Repository

```bash
git clone https://github.com/guruprasad06/EaseWallet.git
cd EaseWallet
```

### Frontend Setup

```bash
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Current Progress

### Completed

* Frontend UI
* Authentication Context
* Protected Routes
* Dashboard
* Profile Page
* Vault Page
* Express Server
* MongoDB Atlas Connection
* User Model
* Registration API

### In Progress

* Password Hashing
* Login API
* JWT Authentication
* User Sessions

### Planned Features

* File Uploads
* Folder Management
* Search Functionality
* Encryption Layer
* Activity Logs
* Admin Dashboard
* AI-powered Content Organization
* Smart Search
* Cloud Storage Integration

## Roadmap

### Phase 1

* Authentication
* Dashboard
* Vault Management

### Phase 2

* JWT Security
* File Uploads
* Folder Structure

### Phase 3

* Encryption
* AI Features
* Advanced Search

### Phase 4

* Production Deployment
* Monitoring
* Scaling

## Author

Guru Prasad

## License

This project is developed for educational and portfolio purposes.
