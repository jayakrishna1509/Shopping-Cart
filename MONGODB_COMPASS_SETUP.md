# MongoDB Compass Setup Guide

This guide will help you set up a MongoDB connection using MongoDB Compass for the Shopping Cart application.

## Step 1: Install MongoDB Compass

If you haven't already, download and install MongoDB Compass from:
https://www.mongodb.com/try/download/compass

## Step 2: Create a New Connection in MongoDB Compass

### Option A: Local MongoDB Connection (Recommended for Development)

1. **Open MongoDB Compass**

2. **Click "New Connection"** or the "+" button

3. **Connection String Format:**
   ```
   mongodb://localhost:27017
   ```
   Or simply use:
   ```
   localhost:27017
   ```

4. **Connection Details:**
   - **Host:** `localhost`
   - **Port:** `27017` (default MongoDB port)
   - **Authentication:** None (if MongoDB is running without authentication)
   - **Connection Name:** `Shopping Cart Local` (optional, for your reference)

5. **Click "Connect"**

6. **Create Database:**
   - After connecting, click "CREATE DATABASE" button
   - **Database Name:** `shopping-cart`
   - **Collection Name:** `users` (or any name, collections will be created automatically)
   - Click "Create Database"

### Option B: MongoDB Atlas Connection (Cloud)

1. **Create MongoDB Atlas Account:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account
   - Create a free cluster (M0 Sandbox)

2. **Get Connection String:**
   - In Atlas dashboard, click "Connect" on your cluster
   - Choose "Connect using MongoDB Compass"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

3. **In MongoDB Compass:**
   - Click "New Connection"
   - Paste the connection string
   - Replace `<password>` with your actual database password
   - Replace `<database>` with `shopping-cart` or leave it to create later
   - Click "Connect"

## Step 3: Verify Connection

After connecting, you should see:
- Your connection in the left sidebar
- The `shopping-cart` database (or you can create it)
- Collections will be created automatically when the app runs

## Step 4: Update .env File

Once connected, update your `.env` file in the `backend` directory:

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/shopping-cart
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopping-cart
```

## Step 5: Test the Connection

1. Start your backend server:
   ```bash
   cd backend
   npm start
   ```

2. Check the console - you should see:
   ```
   Connected to MongoDB
   ```

3. In MongoDB Compass, refresh and you should see collections being created:
   - `users`
   - `items`
   - `carts`
   - `orders`

## Troubleshooting

### Connection Refused
- **Problem:** Can't connect to `localhost:27017`
- **Solution:** 
  - Make sure MongoDB service is running
  - Windows: Check Services (services.msc) for "MongoDB Server"
  - Mac/Linux: Run `sudo systemctl start mongod` or `brew services start mongodb-community`

### Authentication Failed (Atlas)
- **Problem:** Authentication error when connecting to Atlas
- **Solution:**
  - Make sure your IP address is whitelisted in Atlas Network Access
  - Verify your username and password are correct
  - Check that the database user has proper permissions

### Database Not Found
- **Problem:** Database doesn't exist
- **Solution:** 
  - The database will be created automatically when you first run the app
  - Or create it manually in Compass by clicking "CREATE DATABASE"

### Connection String Format
- **Local:** `mongodb://localhost:27017/shopping-cart`
- **Atlas:** `mongodb+srv://username:password@cluster.mongodb.net/shopping-cart`
- **With Authentication (Local):** `mongodb://username:password@localhost:27017/shopping-cart`

## Quick Reference

### Default MongoDB Settings
- **Host:** localhost
- **Port:** 27017
- **Default Database:** shopping-cart

### Connection String Examples

**Local (No Auth):**
```
mongodb://localhost:27017/shopping-cart
```

**Local (With Auth):**
```
mongodb://myuser:mypassword@localhost:27017/shopping-cart
```

**Atlas:**
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/shopping-cart?retryWrites=true&w=majority
```

## Next Steps

After setting up MongoDB Compass:

1. ✅ Create `.env` file with the connection string
2. ✅ Generate JWT secret (see below)
3. ✅ Run `npm run seed` to populate initial items
4. ✅ Start the backend server
5. ✅ Start the frontend server
