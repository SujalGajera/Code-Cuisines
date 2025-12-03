# Code & Cuisine

A comprehensive Restaurant Management System built with React and Firebase. This application provides distinct portals for Administrators, Staff/Receptionists, and Customers to manage all aspects of restaurant operations.

## 🚀 Features

### 👑 Admin Portal
- **Dashboard Overview**: Real-time insights into restaurant performance.
- **Staff Management**: Manage staff accounts, roles, and shifts.
- **Menu Management**: Add, edit, and remove menu items with images.
- **Reservation Management**: View and manage table bookings.
- **Payment & Orders**: Track customer orders and payment history.
- **User Management**: Manage customer and staff access.

### 🍽️ Customer Portal
- **Menu Browsing**: View the full menu with categories and search.
- **Ordering System**: Add items to cart and place orders.
- **Table Reservation**: Book tables for specific dates and times.
- **Order History**: View past orders and their status.
- **Profile Management**: Update personal details and preferences.
- **Feedback**: Submit reviews and feedback.

### 💼 Staff & Receptionist Portal
- **Shift Management**: View assigned shifts and schedules.
- **Reservation Handling**: Manage walk-ins and phone bookings.
- **Order Processing**: View and update order statuses.

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Styling**: CSS3 (Custom responsive design)
- **Backend**: Firebase (Firestore Database)
- **Authentication**: Firebase Authentication
- **Routing**: React Router v6

## 📂 Project Structure

The project is organized by team responsibilities and shared resources:

```
src/
├── Sujal/          # Admin Dashboard & Core Pages
├── Yubraj/         # Customer Portal & Features
├── Roshan/         # Receptionist Dashboard & Auth
├── Heli/           # Staff Portal & Auth
├── components/     # Shared UI Components
├── contexts/       # Global State (Auth, Cart, Admin)
├── routes/         # Protected Route Logic
├── utils/          # Helper Functions
├── assets/         # Images and Static Files
└── firebase.js     # Firebase Configuration
```

## 🚦 Getting Started

### Prerequisites
- Node.js installed
- npm or yarn package manager

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd Code-Cuisines
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm start
    ```
    The app will open at [http://localhost:3000](http://localhost:3000).

## 🔐 Roles & Access

- **Admin**: Full access to all modules.
- **Staff/Receptionist**: Access to specific operational modules.
- **Customer**: Access to ordering and reservation features.

## 🤝 Contributors

- **Sujal** - Admin Dashboard & Core Architecture
- **Yubraj** - Customer Features & Ordering System
- **Roshan** - Receptionist Module & Authentication
- **Heli** - Staff Module & Authentication

---
*Built for the Year 2 Block 2 Project.*
