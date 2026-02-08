# Setup Checklist - Step by Step

Follow these steps in order to set up your Shopping Cart application.

## ✅ Step 1: MongoDB Compass Connection

### A. Open MongoDB Compass
- Launch MongoDB Compass application

### B. Create New Connection
1. Click **"New Connection"** button (or the **"+"** icon)
2. In the connection string field, enter:
   ```
   mongodb://localhost:27017
   ```
3. Click **"Connect"**

### C. Create Database
1. After connecting, click **"CREATE DATABASE"** button
2. Enter:
   - **Database Name:** `shopping-cart`
   - **Collection Name:** `users` (any name, will be auto-created)
3. Click **"Create Database"**

✅ **Connection verified when you see the `shopping-cart` database in Compass**

---

## ✅ Step 2: Generate JWT Secret

### Option 1: Using npm script (Recommended)
```bash
cd backend
npm run generate-secret
```
**Copy the generated secret** - you'll need it in the next step!

### Option 2: Using Node.js directly
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

✅ **You should have a long random string (128 characters)**

---

## ✅ Step 3: Create .env File

1. Navigate to `backend` folder
2. Create a new file named `.env` (no extension)
3. Add the following content:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shopping-cart
JWT_SECRET=paste-your-generated-secret-here
```

**Replace `paste-your-generated-secret-here` with the secret from Step 2**

✅ **.env file created with all required variables**

---

## ✅ Step 4: Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

✅ **All dependencies installed**

---

## ✅ Step 5: Seed Initial Data (Optional)

```bash
cd backend
npm run seed
```

This will add 8 sample items to your database.

✅ **Sample items added to database**

---

## ✅ Step 6: Start the Application

### Terminal 1 - Backend
```bash
cd backend
npm start
```

You should see:
```
Connected to MongoDB
Server running on port 5000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:3000/
```

✅ **Both servers running successfully**

---

## ✅ Step 7: Create a Test User

### Using curl (in a new terminal):
```bash
curl -X POST http://localhost:5000/api/users ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser\",\"password\":\"testpass123\"}"
```

### Or using Postman/Insomnia:
- **Method:** POST
- **URL:** `http://localhost:5000/api/users`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "username": "testuser",
    "password": "testpass123"
  }
  ```

✅ **User created successfully**

---

## ✅ Step 8: Test the Application

1. Open browser: `http://localhost:3000`
2. Login with:
   - Username: `testuser`
   - Password: `testpass123`
3. Browse items and add to cart
4. Test checkout and order history

✅ **Application working correctly!**

---

## 🔧 Troubleshooting

### MongoDB Connection Issues
- **Problem:** Can't connect in Compass
- **Solution:** 
  - Check if MongoDB service is running
  - Windows: Open Services (Win+R → `services.msc`) → Find "MongoDB Server"
  - Try connection string: `mongodb://127.0.0.1:27017`

### JWT Secret Issues
- **Problem:** Authentication not working
- **Solution:** 
  - Regenerate secret: `npm run generate-secret`
  - Make sure it's in `.env` file (no quotes needed)
  - Restart backend server

### Port Already in Use
- **Problem:** Port 5000 or 3000 already in use
- **Solution:**
  - Change PORT in `.env` to another port (e.g., 5001)
  - Update frontend `vite.config.js` proxy target if needed

### Database Not Found
- **Problem:** Database doesn't exist
- **Solution:** 
  - Create it manually in Compass
  - Or it will be created automatically when app runs

---

## 📚 Additional Resources

- **MongoDB Compass Setup:** `MONGODB_COMPASS_SETUP.md`
- **JWT Secret Guide:** `backend/JWT_SECRET_GUIDE.md`
- **Quick Start:** `QUICK_START.md`
- **Full Documentation:** `README.md`

---

## ✨ You're All Set!

Your shopping cart application is now ready to use. Happy coding! 🚀
