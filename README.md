# SamahShop • Luxury Fashion E-commerce

A modern, high-end e-commerce platform built with the MERN stack, featuring a premium typography-focused design, sophisticated animations, and a securely decoupled admin panel for catalog and platform management.

## Features

### Digital Storefront (Frontend)
- **Luxury Aesthetic**: Typography-driven design using *Cormorant Garamond* and *Poppins* for a premium lookbook feel.
- **Product Discovery**: Optimized category pages with scroll-reveal animations and interactive product cards, powered by backend search API (pagination, sorting).
- **Advanced Product View**: Detailed item pages with size selection, "Add to Bag" visual feedback, customer review system, and related product recommendations.
- **User Authentication**: Secure Login/Signup system using JWT (JSON Web Tokens).
- **Interactive Shopping Bag & Orders**: Real-time cart updates, secure checkout flow leading directly to a dynamic Order History tracker.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop experiences.

### Management Portal (Admin Panel)
- **Role-Based Access Control (RBAC)**: Securely protected by Admin-specific authentication logic. 
- **Analytics Dashboard**: Quick overview of the current collection metrics, revenue.
- **Order Processing**: Interface for tracking and managing the status of customer orders.
- **User Management**: Track and soft-delete/suspend active user accounts.
- **Catalog Management**: Interface for adding, viewing, and removing products from the storefront, with integrated image processing (Multer).

## Tech Stack

- **Frontend**: React.js, React Router, Vanilla CSS (Premium Glassmorphism & Custom Layouts).
- **Admin**: React.js (Vite), React Router.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ODM).
- **Authentication**: JWT & LocalStorage integration, with password hashing via bcryptjs.
- **Asset Management**: Multer (Local Disk Storage for images).

## Admin Credentials
For testing the newly established decoupled Admin Panel directly, you can log in using the pre-configured admin account:
- **Admin Login URL:** `http://localhost:5173/`
- **Email:** `admin@admin.com`
- **Password:** `adminpassword123`

## Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB instance.

### 1. Backend Setup
```bash
cd backend
npm install
node index.js
```
The server will start on [http://localhost:4100](http://localhost:4100).

### 2. Frontend Setup (Customer Storefront)
```bash
cd frontend
npm install
npm start
```
The storefront will be available at [http://localhost:3000](http://localhost:3000).

### 3. Admin Setup (Management Portal)
```bash
cd admin
npm install
npm run dev
```
The admin panel will be available at [http://localhost:5173](http://localhost:5173).

## Project Structure

```text
├── admin/            # Vite-based standalone admin interface (Port 5173)
├── backend/          # Express server and MongoDB models (Port 4100)
│   └── upload/       # Local storage for product images
└── frontend/         # CRA-based secured customer storefront (Port 3000)
    ├── src/
    │   ├── Components/ # Reusable UI pieces
    │   ├── Context/    # Shop logic and state management
    │   └── Pages/      # Main application routes
```

## Configuration
- **Database**: The MongoDB connection string is managed in `backend/index.js`.
- **Port**: Default backend port is `4100`.
- **JWT Secret**: Default secret for authentication is defined as `secret_ecom`.

---
*Created by Samah *
