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

## 📌 API Endpoints
**BaseUrl:** not published yet

### 🔹 Authentication
- **User Registration**  
Method: **POST**
Endpoint: **/auth/register**
  **Body:**
  ```json`
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@gmail.com",
	"password": "jsdev@123",
	"address": "Forkerhat, Rajarhat, Kurigram",
	"profilePic": ""
  }`

After providing all of the informations if you hit the endpoint a **verfication code** will be sent to the provided email address. Here **address** & **profilePic** properties are optional. 

- **User verification**
Method: **POST**
Endpoint: **/auth/verify**
  **Body:**
  ```json
  {
    "email": "john.doe@gmail.com",
    "code": "656545"
  }`
After providing the right email address and the correct verification code in the request body, if you hit the endpoint user will be verified can can be logged in anytime.