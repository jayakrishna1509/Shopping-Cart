# Shopping Cart Application

A full-stack e-commerce shopping cart application built with Node.js/Express/MongoDB backend and React frontend.

## Features

- User authentication with JWT tokens
- Single-device login enforcement (one active session per user)
- Item browsing and management
- Shopping cart functionality
- Order placement and history
- Fully responsive design with Tailwind CSS

## Project Structure

```
shopping-cart-app/
├── backend/          # Node.js/Express backend
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── middleware/   # Authentication middleware
│   └── server.js     # Express server
├── frontend/         # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   └── utils/       # API utilities
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shopping-cart
JWT_SECRET=your-secret-key-change-this-in-production
```

4. Start MongoDB (if running locally):
```bash
# On Windows (if MongoDB is installed as a service, it should start automatically)
# On macOS/Linux:
mongod
```

5. Start the backend server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

# Backend API Documentation

## Setup

1. Install dependencies: `npm install`
2. Create `.env` file with:
   - `PORT=5000`
   - `MONGODB_URI=mongodb://localhost:27017/shopping-cart`
   - `JWT_SECRET=your-secret-key`
3. Start MongoDB
4. Run server: `npm start` or `npm run dev`

## Models

### User
- `username` (String, unique, required)
- `password` (String, hashed, required)
- `token` (String, nullable) - Stores active JWT token

### Item
- `name` (String, required)
- `description` (String)
- `price` (Number, required)

### Cart
- `user` (ObjectId, ref: User, unique)
- `items` (Array of CartItems)
  - `item` (ObjectId, ref: Item)
  - `quantity` (Number, default: 1)

### Order
- `user` (ObjectId, ref: User)
- `items` (Array of OrderItems)
  - `item` (ObjectId, ref: Item)
  - `quantity` (Number)
  - `price` (Number)
- `totalAmount` (Number)

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: <token>
```

The token is validated against the token stored in the user's database record to enforce single-device login.

The backend server will run on `http://localhost:5000`

## Login Credentials
```
{
    "username": "testuser",
    "password": "testpass123"
}
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### User Endpoints
- `POST /api/users` - Create a new user
- `GET /api/users` - List all users
- `POST /api/users/login` - Login user (returns JWT token)
- `POST /api/users/logout` - Logout user (requires authentication)

### Item Endpoints
- `POST /api/items` - Create an item
- `GET /api/items` - List all items

### Cart Endpoints (Protected)
- `POST /api/carts` - Add item to cart (requires authentication)
- `GET /api/carts` - Get user's cart (requires authentication)

### Order Endpoints (Protected)
- `POST /api/orders` - Create order from cart (requires authentication)
- `GET /api/orders` - Get user's orders (requires authentication)

## Usage

1. **Create a User**: Use the signup endpoint or create a user directly in the database
2. **Login**: Use the login screen to authenticate
3. **Browse Items**: View all available items on the main screen
4. **Add to Cart**: Click on any item to add it to your cart
5. **View Cart**: Click the "Cart" button to see items in your cart
6. **Checkout**: Click "Checkout" to convert your cart into an order
7. **View Orders**: Click "Order History" to see all your past orders

## Single-Device Login

The application enforces single-device login:
- When a user logs in, a token is stored in the database
- If a user tries to log in from another device while already logged in, they will receive an error message
- The token is cleared when the user logs out, allowing them to log in again

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- CORS

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- Lucide React (icons)

## Development

To run both backend and frontend in development mode:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## Notes

- Make sure MongoDB is running before starting the backend
- The frontend proxy is configured to forward `/api` requests to `http://localhost:5000`
- All cart and order endpoints require authentication (JWT token in Authorization header)
- The application uses responsive design and works on mobile, tablet, and desktop devices
