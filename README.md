# 📦 Inventory Management System (ERP)/ Inventra

A complete backend-based Inventory Management and ERP System built with **Node.js, Express.js, and MongoDB**.  
This system helps businesses manage products, suppliers, purchases, sales, stock levels, inventory transactions, and dashboard analytics efficiently.

---

## 🚀 Features

## 🔐 Authentication & Authorization

- User login authentication
- JWT based authentication
- Protected API routes
- Secure access control using middleware

---

# 📦 Product Management

- Create new products
- Get all products
- Get product by ID
- Update product details
- Delete products
- Manage product stock
- Track minimum stock level
- Product and supplier relationship management

---

# 🏷️ Category Management

- Create categories
- View categories
- Update categories
- Delete categories
- Category based product organization

---

# 🚚 Supplier Management

- Add suppliers
- View supplier details
- Update supplier information
- Delete suppliers
- Manage supplier-product relationships

---

# 🛒 Purchase Management

- Create purchase records
- View all purchases
- Update purchase details
- Delete purchases
- Automatic stock increase after purchase
- Purchase transaction tracking
- Supplier and product mapping

---

# 💰 Sales Management

- Create sales records
- View sales history
- Update sales details
- Delete sales
- Automatic stock deduction after sale
- Sales transaction tracking
- Customer purchase records

---

# 📊 Inventory Management

- Real-time stock tracking
- Stock In / Stock Out transaction history
- Product-wise inventory tracking
- Inventory summary
- Stock consistency management

---

# 📈 Dashboard & Analytics

Dashboard provides important business insights:

- Total products count
- Total categories count
- Total suppliers count
- Total purchase count
- Total sales count
- Total stock value
- Total revenue calculation
- Total purchase cost
- Low stock product list
- Recent purchases
- Recent sales

---

# 🛠️ Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose ODM

## Authentication

- JSON Web Token (JWT)

## Development Tools

- VS Code
- Postman
- Git & GitHub

---

# 📂 Project Structure

Inventory-Management-System/

│ ├── src/ │ │ │ ├── config/ │ │ │ ├── controllers/ │ │ │ ├── middleware/ │ │ │ ├── models/ │ │ │ ├── routes/ │ │ │ ├── services/ │ │ │ ├── utils/ │ │ │ └── validators/ │ ├── app.js ├── server.js │ ├── .env.example ├── .gitignore ├── package.json ├── package-lock.json └── README.md

---

# ⚙️ Installation & Setup

## 1. Clone Repository

```bash
git clone <repository-url>

2. Navigate to Project Directory

cd Inventory-Management-System

3. Install Dependencies

npm install

4. Environment Configuration

Create a .env file in the root directory.

Example:

PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key


---

▶️ Run Application

Development Mode

npm run dev

Production Mode

npm start


---

🔗 API Modules

Authentication

/api/v1/auth

Products

/api/v1/products

Categories

/api/v1/categories

Suppliers

/api/v1/suppliers

Purchases

/api/v1/purchases

Sales

/api/v1/sales

Inventory Transactions

/api/v1/inventory-transactions

Dashboard

/api/v1/dashboard


---

🔒 Environment Variables

Variable	Description

PORT	Server port
MONGODB_URI	MongoDB database connection
JWT_SECRET	Authentication secret key



---

🧪 Testing

API testing performed using:

Postman


Tested modules:

✅ Authentication
✅ Product CRUD
✅ Supplier CRUD
✅ Purchase CRUD
✅ Sales CRUD
✅ Inventory Tracking
✅ Dashboard APIs


---

🔮 Future Improvements

Planned features:

Role Based Access Control (Admin / Manager / Staff)

Invoice generation

PDF invoice download

Advanced sales reports

Profit & Loss analytics

Excel import/export

Customer management

Payment tracking

Email notifications

Multi warehouse support
```
