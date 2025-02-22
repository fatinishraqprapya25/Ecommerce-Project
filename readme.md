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

### 🔹 Products Section

-   **Get All Products:**
    -   Method: **GET**
    -   Endpoint: `/products/`
    -   Result: After hitting the endpoint, you will get some products informations. There are some query params in the reques. Like maxPrice, minPrice, limit, page, sortBy, sortOrder, category & search. By using this params, your browsing will be enhanced.

-   **Get Single Product:**
    -   Method: **GET**
    -   Endpoint: `/products/${productID}`
    -   Result: After hitting the endpoint, you will get the product information of the provided Id.

-   **Create Product:**
    -   Method: **POST**
    -   Endpoint: `/products/`
    -   Authentication: Requires a valid authorization token in the request header.

    Request Body:
    ```json 
    {
      "name": "Z2 SSD",
      "category": "Electronics",
      "description": "a usefull product for programmers",
      "price": "1000",
      "stock": "500",
      "brand": "HP",
      "images": ""
    }

-   **Update Product:**
    -   Method: **PATCH**
    -   Endpoint: `/products/${productId}`
    -   Authentication: Requires a valid authorization token in the request header.

    Request Body:
    ```json 
    {
      "name": "Z2 SSD",
      "category": "Electronics"
    }


-   **Delete Product:**
    -   Method: **DELETE**
    -   Endpoint: `/products/${productId}`
    -   Authentication: Requires a valid authorization token in the request header.


### 🔹 Cart Section

-   **Create or Update Cart:**
    -   Method: **POST**
    -   Endpoint: `/cart`
    -   Authentication: Requires a valid authorization token in the request header.

    Request Body:
    ```json 
    {
      "productId": "671c847389d1b693b1bbb111",
      "quantity": 2 //optional
    }

-   **Get Cart By User Id:**
    -   Method: **Get**
    -   Endpoint: `/cart`
    -   Authentication: Requires a valid authorization token in the request header.

-   **Update Product Quantity:**
    -   Method: **PATCH**
    -   Endpoint: `/cart`
    -   Authentication: Requires a valid authorization token in the request header.

    Request Body:
    ```json 
    {
      "quantity": 2 
    }

-   **Remove Product From Cart:**
    -   Method: **Delete**
    -   Endpoint: `/cart/${productId}`
    -   Authentication: Requires a valid authorization token in the request header.

-   **Clear Cart:**
    -   Method: **Delete**
    -   Endpoint: `/cart/`
    -   Authentication: Requires a valid authorization token in the request header.


### 🔹 Wishlist Section

-   **Create or Update Wishlist:**
    -   Method: **POST**
    -   Endpoint: `/wishlist`
    -   Authentication: Requires a valid authorization token in the request header.

    Request Body:
    ```json 
    {
      "productId": "671c847389d1b693b1bbb111",
    }

-   **Get Wishlist By User Id:**
    -   Method: **Get**
    -   Endpoint: `/wishlist`
    -   Authentication: Requires a valid authorization token in the request header.


-   **Remove Product From Wishlist:**
    -   Method: **Delete**
    -   Endpoint: `/wishlist/${productId}`
    -   Authentication: Requires a valid authorization token in the request header.

-   **Clear Wishlist:**
    -   Method: **Delete**
    -   Endpoint: `/wishlist/`
    -   Authentication: Requires a valid authorization token in the request header.
