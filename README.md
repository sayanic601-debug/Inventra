# 📦 Inventra

### Electronics Retail Inventory Management System

Inventra is a backend-based inventory management system designed for electronics retail businesses. It helps manage products, categories, suppliers, customers, purchases, sales, and inventory in one centralized system.

The system automatically updates product stock when purchases and sales are recorded and provides dashboard insights for monitoring inventory and business activity.

---

## ✨ Features

- 🔐 JWT-based authentication
- 📦 Product management
- 🏷️ Category management
- 🏭 Supplier management
- 👥 Customer management
- 🛒 Purchase management
- 💰 Sales management
- 📊 Inventory and stock tracking
- 🔄 Automatic stock updates
- ⚠️ Low-stock monitoring
- 📈 Dashboard with business insights
- 🔎 Search, filtering, sorting, and pagination
- 📋 Customer purchase history
- 📝 Inventory transaction tracking

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT
- **API Testing:** Postman
- **Version Control:** Git, GitHub
- **Deployment:** Render

---

## 🏗️ Architecture

```text
Routes
   ↓
Middleware
   ↓
Controllers
   ↓
Services
   ↓
Models
   ↓
MongoDB


---

⚙️ Installation

Clone the repository

git clone <YOUR_REPOSITORY_URL>
cd Inventra

Install dependencies

npm install

Configure environment variables

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Run the application

npm run dev

Or:

node server.js

The server will run on:

http://localhost:5000


---

🧪 API Testing

The APIs can be tested using Postman.

Main modules:

Authentication

Products

Categories

Suppliers

Customers

Purchases

Sales

Inventory

Dashboard


Protected APIs require a JWT Bearer Token:

Authorization: Bearer YOUR_JWT_TOKEN


---

🚀 Deployment

The application can be deployed using platforms such as Render.

Required production environment variables:

PORT=5000
MONGO_URI=your_production_mongodb_connection_string
JWT_SECRET=your_production_jwt_secret
```
