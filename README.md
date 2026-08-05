# 📦 Inventra

> A RESTful Backend API for an Electronics Retail Inventory Management System built with Node.js, Express.js, MongoDB, and Mongoose.

---

## 📖 Overview

Inventra is a backend inventory management system designed for electronics retail stores. It provides secure authentication, role-based access control, product management, supplier management, customer management, purchase and sales tracking, inventory transaction logging, and dashboard analytics.

The project follows a modular architecture using controllers, services, middleware, and models, making it scalable and easy to maintain.

---

## ✨ Features

- 🔐 JWT Authentication & Authorization
- 👥 Role-Based Access Control (Admin, Manager, Staff)
- 📂 Category Management
- 🏢 Supplier Management
- 📦 Product Management
- 👤 Customer Management
- 🛒 Purchase Management
- 💰 Sales Management
- 📊 Dashboard Analytics
- 📋 Inventory Transaction Tracking
- 📖 Swagger API Documentation
- ✅ Input Validation
- ❌ Global Error Handling
- 🗄️ MongoDB Database Integration

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JSON Web Token (JWT)
- bcrypt

### API Documentation

- Swagger UI
- swagger-jsdoc

### Tools

- Postman
- Git
- GitHub
- Nodemon

---

## 📁 Project Structure

```
inventra/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── swagger.js
├── package.json
├── .env.example
└── README.md
```

---

## 🔑 User Roles

The application supports the following user roles:

- Admin
- Manager
- Staff

Role-based authorization ensures users can access only the resources permitted for their role.

---

## 📚 API Modules

### Authentication

- Register User
- Login User
- Get Profile

### Categories

- Create Category
- Get All Categories
- Get Category By ID
- Update Category
- Delete Category

### Suppliers

- Create Supplier
- Get All Suppliers
- Get Supplier By ID
- Update Supplier
- Delete Supplier

### Products

- Create Product
- Get All Products
- Get Product By ID
- Update Product
- Delete Product

### Customers

- Create Customer
- Get All Customers
- Get Customer By ID
- Update Customer
- Delete Customer

### Purchases

- Create Purchase
- Get All Purchases
- Get Purchase By ID
- Update Purchase
- Delete Purchase

### Sales

- Create Sale
- Get All Sales
- Get Sale By ID
- Update Sale
- Delete Sale

### Inventory Transactions

- Get All Transactions
- Get Transaction By ID

### Dashboard

- Dashboard Summary
- Recent Sales
- Recent Purchases
- Low Stock Products
- Total Products
- Total Categories
- Total Suppliers
- Total Customers

---

## 🔐 Authentication

Protected endpoints require a Bearer Token.

Example:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📖 API Documentation

Swagger Documentation:

```
http://localhost:5000/api-docs
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/inventra.git
```

### 2. Navigate to the project directory

```bash
cd inventra
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

### 5. Start the development server

```bash
npm run dev
```

The server will start at:

```
http://localhost:5000
```

---

## 🧪 API Testing

The APIs have been tested using:

- Swagger UI
- Postman

Testing includes:

- Authentication
- Authorization
- CRUD Operations
- Validation
- Error Handling
- Purchase & Sales Flow
- Inventory Updates
- Dashboard Verification

---

## 📦 Standard API Response

### Success

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Error message"
}
```

---

## 🚀 Future Enhancements

- Product Image Upload
- Barcode & QR Code Support
- Search & Filtering
- Pagination
- Sales Report
- Purchase Report
- Excel/PDF Export
- Email Notifications
- Docker Support
- Redis Caching
- Unit Testing
- Integration Testing
- CI/CD Pipeline

---
