# **🛒 E-Commerce Application**
###  📌 Overview
This is a full-featured eCommerce application built using **Express.js** and **MongoDB** with **Mongoose** for database interactions. It provides a seamless shopping experience, including user authentication, product management, cart functionality, and order processing.

### ✨ Features
 -  **User Authentication & Authorization**
   - Register & login with JWT authentication
   - Role-based access (Admin & Customer)
   - Account activation and user status management
 - **Product Management**
   - Create, update, delete products (Admin only)
   - Product listing with search and filtering options
 - **Cart & Order System**
   - Add/remove products from the cart
   - Place and manage orders
 - **Payment Integration (Upcoming)**
   - Secured Payment Processing

### 🏗️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Validation**: Zod
- **Testing**: Postman (for API testing)

### 🚀 Installation & Setup
- Clone the repository:
`git clone https://github.com/yourusername/ecommerce-app.git`
 `cd ecommerce-app`
 
- Install dependencies:
`npm install`
- Configure environment variables:
 - Create a .env file in the root directory and add the required variables
   
  `PORT=5000`
  `MONGO_CONNECTION_STRING=your_mongodb_uri`
  `JWT_SECRET=your_jwt_secret`
  `BCRYPT_CIRCLE_COUNT=10`
  `EMAIL=youemail@gmail.com`
  `APP_PASS=your_email_app's_pass`

- Run the application:

   `npm run start // production`
   `npm run start:dev // development` 



