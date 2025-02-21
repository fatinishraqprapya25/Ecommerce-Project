# 🛒 E-Commerce Application

## 📌 Overview

This is a full-featured eCommerce application built using **Express.js** and **MongoDB** with **Mongoose** for database interactions. It provides a seamless shopping experience, including user authentication, product management, cart functionality, and order processing.

## ✨ Features

- **User Authentication & Authorization**
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

## 🏗️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Validation:** Zod
- **Testing:** Postman (for API testing)

## 🚀 Installation & Setup

1.  Clone the repository:

    ```bash
    git clone [https://github.com/yourusername/ecommerce-app.git](https://github.com/yourusername/ecommerce-app.git)
    cd ecommerce-app
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Configure environment variables:

    -   Create a `.env` file in the root directory and add the required variables:

        ```
        PORT=5000
        MONGO_CONNECTION_STRING=your_mongodb_uri
        JWT_SECRET=your_jwt_secret
        BCRYPT_CIRCLE_COUNT=10
        EMAIL=[email address removed]
        APP_PASS=your_email_app_password
        ```

4.  Run the application:

    ```bash
    npm run start       # production
    npm run start:dev   # development
    ```

## 📌 API Endpoints

**Base URL:** _not published yet_

### 🔹 Authentication

-   **User Registration**

    -   Method: **POST**
    -   Endpoint: `/auth/register`
    -   Body:

        ```json
        {
          "firstName": "John",
          "lastName": "Doe",
          "email": "john.doe@gmail.com",
          "password": "jsdev@123",
          "address": "Forkerhat, Rajarhat, Kurigram",
          "profilePic": ""
        }
        ```

        _Note: `address` & `profilePic` are optional. A verification code will be sent to the provided email address._

-   **User Verification**

    -   Method: **POST**
    -   Endpoint: `/auth/verify`
    -   Body:

        ```json
        {
          "email": "john.doe@gmail.com",
          "code": "656545"
        }
        ```

-   **User Login**

    -   Method: **POST**
    -   Endpoint: `/auth/login`
    -   Body:

        ```json
        {
          "email": "john.doe@gmail.com",
          "password": "your_password"
        }
        ```

    -   Successful Response:

        ```json
        {
          "success": "true",
          "message": "User logged in successfully!",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
        ```

-   **Forget & Reset Password**

    -   **Send Code:**
        -   Method: **POST**
        -   Endpoint: `/auth/sendcode`
        -   Body:

            ```json
            {
              "email": "john.doe@gmail.com"
            }
            ```

    -   **Reset Password:**
        -   Method: **POST**
        -   Endpoint: `/auth/resetpass`
        -   Body:

            ```json
            {
              "email": "john.doe@gmail.com",
              "code": "256565",
              "password": "hello124"
            }
            ```
-   **Update User Information:**
    -   Method: **PUT**
    -   Endpoint: `/user/`
    -   Authentication: Requires a valid authorization token in the request header.
    -   Body:
        ```json
        {
          "firstName": "rahim"
        }
        ```
        _Note: Only the fields provided in the body will be updated._

### 🔹 Admin Panel

-   **Create Admin:**
    -   Method: **Post**
    -   Endpoint: `/admin/`
    -   Authentication: Requires a valid authorization token in the request header.
    -   Body:
        ```json
        {
          "email": "dev.prapya@gmail.com"
        }
        ```

-   **Get All Admins:**
    -   Method: **GET**
    -   Endpoint: `/admin/`
    -   Authentication: Requires a valid authorization token in the request header.

-   **Get Single Admin:**
    -   Method: **GET**
    -   Endpoint: `/admin/${adminId}`
    -   Authentication: Requires a valid authorization token in the request header.

-   **Remove Admin:**
    -   Method: **DELETE**
    -   Endpoint: `/admin/${adminId}`
    -   Authentication: Requires a valid authorization token in the request header.

-   **Disabble user:**
    -   Method: **POST**
    -   Endpoint: `/admin/disable/${userId}`
    -   Authentication: Requires a valid authorization token in the request header.

-   **Enable user:**
    -   Method: **POST**
    -   Endpoint: `/admin/enable/${userId}`
    -   Authentication: Requires a valid authorization token in the request header.


### 🔹 Admin Panel
-   **Get All Campaigns:**
    -   Method: **GET**
    -   Endpoint: `/campaign/`
    -   Authentication: Requires a valid authorization token in the request header.

-   **Get Active Campaigns:**
    -   Method: **GET**
    -   Endpoint: `/campaign/active`
    -   Authentication: Requires a valid authorization token in the request header.

-   **Get Campaign By ID:**
    -   Method: **GET**
    -   Endpoint: `/campaign/${id}`
    -   Authentication: Requires a valid authorization token in the request header.


-   **Create Campaign:**
    -   Method: **POST**
    -   Endpoint: `/campaign/`
    -   Authentication: Requires a valid authorization token in the request header.

    Request Body:
    ```json 
    {
      "title": "Eid Special Offter",
      "description": "eid sdfsdfsjdlfkjslkdfjlksjdf",
      "discountParentage": "13",
      "images": "file"
    }

-   **Update Campaign:**
    -   Method: **POST**
    -   Endpoint: `/campaign/${campaignId}`
    -   Authentication: Requires a valid authorization token in the request header.

    Request Body:
    ```json 
    {
      "title": "Eid Special Offter 2",
    }