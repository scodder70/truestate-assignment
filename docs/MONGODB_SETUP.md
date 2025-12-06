# MongoDB Setup Guide

## Quick Setup Steps

### Step 1: Create MongoDB Atlas Account (5 minutes)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Click "Build a Database" → Choose "Free" (M0) tier
4. Select a cloud provider and region (choose closest to you)
5. Click "Create Cluster" (takes 3-5 minutes)

### Step 2: Configure Database Access

1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username (e.g., `admin`) and generate/create a strong password
5. Set privileges to "Read and write to any database"
6. Click "Add User"
7. **IMPORTANT:** Save your username and password securely!

### Step 3: Configure Network Access

1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, restrict to specific IPs
4. Click "Confirm"

### Step 4: Get Connection String

1. Go back to "Database" view
2. Click "Connect" button on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### Step 5: Configure Your Application

1. Open `backend/.env` file
2. Replace the `MONGODB_URI` value with your connection string
3. Replace `<username>` with your database username
4. Replace `<password>` with your database password
5. Example:
   ```
   MONGODB_URI=mongodb+srv://admin:MySecurePass123@cluster0.ab1cd.mongodb.net/retail-sales?retryWrites=true&w=majority
   ```
6. Make sure `IMPORT_CSV=true` for the first run

### Step 6: Run the Application

```powershell
# From the root directory
npm run dev
```

The application will:
1. Connect to MongoDB
2. Import the CSV data (first run only)
3. Start serving data from MongoDB

### Step 7: After First Successful Run

1. Open `backend/.env`
2. Change `IMPORT_CSV=true` to `IMPORT_CSV=false`
3. This prevents re-importing data every time you restart

## Troubleshooting

### "Authentication failed"
- Check your username and password in the connection string
- Make sure you're using the database user credentials, not your MongoDB account

### "Connection timeout"
- Verify Network Access is configured (0.0.0.0/0)
- Check your internet connection

### "Cannot import CSV"
- Verify the CSV file exists in `backend/data/truestate_assignment_dataset.csv`
- Check file permissions

## Verify Database

1. In MongoDB Atlas, click "Browse Collections"
2. You should see `retail-sales` database
3. Inside, you'll see `sales` collection with all your data

## Benefits of MongoDB vs CSV

✅ Faster queries with indexing
✅ Scalable for large datasets
✅ Remote access (works in production)
✅ Better filtering and search capabilities
✅ No need to load entire dataset into memory
✅ Easy to deploy and share

## Next Steps

Once working locally, you can:
1. Deploy to Render/Vercel/Railway
2. Use the same MongoDB connection string in production
3. Set `IMPORT_CSV=false` in production environment variables
