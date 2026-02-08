# Quick Setup Guide

## Prerequisites Check
- [ ] Node.js installed (v14+)
- [ ] MongoDB installed and running
- [ ] npm or yarn installed

## Step-by-Step Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example or create manually)
# Add these variables:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/shopping-cart
# JWT_SECRET=your-secret-key-change-this-in-production

# Start MongoDB (if not running as a service)
# Windows: Usually runs as a service automatically
# Mac/Linux: mongod

# Seed initial items (optional)
npm run seed

# Start the server
npm start
# OR for development with auto-reload:
npm run dev
```

Backend should now be running on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Open a new terminal
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend should now be running on `http://localhost:3000`

### 3. Create a Test User

You can create a user via API:

```bash
# Using curl
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```

Or use Postman/Insomnia to make the request.

### 4. Test the Application

1. Open `http://localhost:3000` in your browser
2. Login with the credentials you created
3. Browse items and add them to cart
4. Click "Cart" to view cart items
5. Click "Checkout" to place an order
6. Click "Order History" to view past orders

## Troubleshooting

### MongoDB Connection Issues
- Make sure MongoDB is running: `mongosh` or check MongoDB service status
- Verify MONGODB_URI in `.env` file
- Try: `mongodb://127.0.0.1:27017/shopping-cart` instead of `localhost`

### Port Already in Use
- Change PORT in backend `.env` file
- Update frontend `vite.config.js` proxy target if you change backend port

### CORS Issues
- Make sure backend CORS is enabled (already configured in server.js)
- Verify frontend proxy settings in `vite.config.js`

### Token Issues
- Clear localStorage if you get authentication errors
- Make sure JWT_SECRET is set in backend `.env`

## Development Tips

- Use `npm run dev` in backend for auto-reload on file changes
- Frontend hot-reloads automatically with Vite
- Check browser console for frontend errors
- Check terminal for backend errors
- Use MongoDB Compass to view database data
