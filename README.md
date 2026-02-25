# SamahShop • Luxury Fashion E-commerce

A modern, high-end e-commerce platform built with the MERN stack, featuring a premium typography-focused design, sophisticated animations, and a decoupled admin panel for catalog management.

## ✨ Features

### 🛍️ Digital Storefront (Frontend)
- **Luxury Aesthetic**: Typography-driven design using *Cormorant Garamond* and *Poppins* for a premium lookbook feel.
- **Dynamic Hero Sections**: Centered, imageless hero sections for Home, Men, Women, and Kids with tailored themes and 3D floating background elements.
- **Product Discovery**: Optimized category pages with scroll-reveal animations and interactive product cards.
- **Advanced Product View**: Detailed item pages with size selection, "Add to Bag" visual feedback, and related product recommendations.
- **User Authentication**: Secure Login/Signup system using JWT (JSON Web Tokens).
- **Interactive Shopping Bag**: Real-time cart updates with persistent storage synced to the user profile.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop experiences.

### 🛡️ Management Portal (Admin Panel)
- **Catalog Management**: Interface for adding, viewing, and removing products from the storefront.
- **Image Upload System**: Integrated image processing using Multer for product asset management.
- **Dashboard Utility**: Quick overview of the current collection metrics.

## 🚀 Tech Stack

- **Frontend**: React.js, React Router, Vanilla CSS (Premium Glassmorphism & Custom Layouts).
- **Admin**: React.js (Vite), React Router.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ODM).
- **Authentication**: JWT & LocalStorage integration.
- **Asset Management**: Multer (Local Disk Storage for images).

## 🛠️ Installation & Setup

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

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```
The storefront will be available at [http://localhost:3000](http://localhost:3000).

### 3. Admin Setup
```bash
cd admin
npm install
npm run dev
```
The admin panel will be available at [http://localhost:5173](http://localhost:5173).

## 📂 Project Structure

```text
├── admin/            # Vite-based admin interface
├── backend/          # Express server and MongoDB models
│   └── upload/       # Local storage for product images
└── frontend/         # CRA-based customer storefront
    ├── src/
    │   ├── Components/ # Reusable UI pieces
    │   ├── Context/    # Shop logic and state management
    │   └── Pages/      # Main application routes
```

## 🔐 Configuration
- **Database**: The MongoDB connection string is managed in `backend/index.js`.
- **Port**: Default backend port is `4100`.
- **JWT Secret**: Default secret for authentication is defined as `secret_ecom`.

---
*Created by Samah • Luxury Boutique Est. 2024*
