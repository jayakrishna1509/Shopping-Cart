# Quick Start Guide - MongoDB Compass & JWT Secret

## 🚀 Quick Setup Steps

### 1. MongoDB Compass Connection

**For Local MongoDB:**
1. Open MongoDB Compass
2. Click "New Connection"
3. Enter: `mongodb://localhost:27017`
4. Click "Connect"
5. Create database: `shopping-cart`

**Connection String for .env:**
```
MONGODB_URI=mongodb://localhost:27017/shopping-cart
```

### 2. Generate JWT Secret

**Option A - Using Script (Easiest):**
```bash
cd backend
npm run generate-secret
```
Copy the output and use it in `.env`

**Option B - Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Create .env File

In the `backend` directory, create a `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shopping-cart
JWT_SECRET=paste-your-generated-secret-here
```

### 4. Complete Setup

```bash
# Backend
cd backend
npm install
npm run seed          # Optional: Add sample items
npm start

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

## 📝 Detailed Guides

- **MongoDB Compass Setup:** See `MONGODB_COMPASS_SETUP.md`
- **JWT Secret Guide:** See `backend/JWT_SECRET_GUIDE.md`
- **Full Setup:** See `SETUP.md`

## ✅ Verification Checklist

- [ ] MongoDB Compass connected
- [ ] `.env` file created in `backend/` directory
- [ ] JWT_SECRET generated and added to `.env`
- [ ] MONGODB_URI set correctly
- [ ] Backend dependencies installed (`npm install`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend server running (`npm start`)
- [ ] Frontend server running (`npm run dev`)

## 🔍 Troubleshooting

**Can't connect to MongoDB?**
- Check if MongoDB service is running
- Verify connection string in `.env`
- Try `mongodb://127.0.0.1:27017/shopping-cart` instead

**JWT Secret not working?**
- Make sure it's at least 32 characters long
- No spaces or special characters that need escaping
- Regenerate if unsure: `npm run generate-secret`
