📦 Inventra - ERP Inventory Management System

A backend-based ERP Inventory Management System built using Node.js, Express.js, and MongoDB.
It helps manage products, suppliers, purchases, sales, stock tracking, inventory transactions, and business analytics.

🚀 Features

🔐 Authentication

- JWT based authentication
- Protected API routes

📦 Product Management

- Product CRUD operations
- Stock and minimum stock tracking

🚚 Supplier Management

- Supplier CRUD operations
- Supplier-product management

🛒 Purchase Management

- Create, update, delete purchases
- Automatic stock increase
- Purchase transaction tracking

💰 Sales Management

- Create, update, delete sales
- Automatic stock deduction
- Sales transaction tracking

📊 Inventory & Dashboard

- Stock In / Stock Out history
- Product-wise inventory tracking
- Dashboard summary
- Low stock products
- Recent purchases and sales

🛠️ Tech Stack

Backend

- Node.js
- Express.js

Database

- MongoDB
- Mongoose

Authentication

- JWT

Tools

- Postman
- Git & GitHub

📂 Project Structure

src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
└── validators/

app.js
server.js

⚙️ Installation

Clone the repository:

git clone <repository-url>

Install dependencies:

npm install

Create ".env" file:

PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

Run the project:

npm run dev

📌 API Modules

- Authentication
- Products
- Categories
- Suppliers
- Purchases
- Sales
- Inventory Transactions
- Dashboard

🔮 Future Improvements

- Role Based Access Control
- Invoice Generation
- Advanced Reports
- PDF/Excel Export
- Customer Management
