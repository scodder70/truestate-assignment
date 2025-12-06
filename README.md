# Retail Sales Management System

## Overview
A full-stack Retail Sales Management System designed to demonstrate professional software engineering capabilities. The application provides authorized users with a dashboard to view sales data, performing advanced operations like full-text search, multi-faceted filtering, sorting, and pagination. It features a responsive React frontend and a robust Node.js backend.

## Tech Stack
- **Frontend**: React (Vite), TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Cloud Database)

## Search Implementation Summary
Search is implemented efficiently on the backend using case-insensitive string matching. It filters against both `Customer Name` and `Phone Number` fields. Debouncing is handled on the frontend (300ms) to ensure performance and reduce unnecessary API calls during typing.

## Filter Implementation Summary
Server-side filtering supports multiple concurrent criteria. It handles:
- **Multi-select** for Region, Gender, Category, and Payment Method (OR logic within fields, AND logic between fields).
- **Date Range** parsing for start/end date filtering.
- **Tags** array overlap matching.
- **Age Range** logic to parse and match numeric scopes (e.g., "18-25").

## Sorting Implementation Summary
Sorting is handled dynamically on the server via query parameters (`sort=Field:Order`). It supports sorting by Date, Quantity, and Customer Name. Special handling checks for Date objects and Case-Insensitive string comparisons to ensure accurate ordering.

## Pagination Implementation Summary
Server-side pagination ensures scalability. The API accepts `page` and `limit` parameters, returning the specific slice of the dataset along with metadata (total items, total pages) to generate platform-agnostic pagination controls on the frontend.

## Setup Instructions

### 1. **Setup MongoDB Atlas (Free Tier)**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Create a free account and cluster
   - Click "Connect" → "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database-name>`)
   - In **Network Access**, add `0.0.0.0/0` to allow all IPs (or your specific IP)
   - In **Database Access**, create a database user with password
   - Create a database and collection:
     - Database name: `truestate-assignment`
     - Collection name: `truestate-assn`
   - Upload your CSV data to the `truestate-assn` collection

### 2. **Configure Environment Variables**
   - Navigate to `backend` folder
   - Create or edit `.env` file with the following:
     ```
     PORT=5000
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/retail-sales?retryWrites=true&w=majority
     NODE_ENV=development
     IMPORT_CSV=false
     ```
   - Replace `<username>` and `<password>` in the connection string with your database credentials
   - **Important:** Set `IMPORT_CSV=false` since you've already uploaded data to MongoDB

### 3. **Install Dependencies**
   Run `npm run install:all` in the root directory.
   *(Or run `npm install` separately in `/backend` and `/frontend`)*

### 4. **Start Application**
   Run `npm run dev` in the root directory.
   - Backend will start on `http://localhost:5000`
   - Frontend will start on `http://localhost:5173`
   - The application will connect to MongoDB and fetch data from the `truestate-assn` collection

### 5. **Access**
   Open your browser to `http://localhost:5173`

## Deployment Instructions

### Deploy to Render (Recommended)

**Backend Deployment:**
1. Push your code to GitHub
2. Create account at [render.com](https://render.com)
3. Create a new **Web Service**:
   - Connect your GitHub repository
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
   - Add environment variables:
     - `MONGODB_URI` = (your MongoDB connection string)
     - `IMPORT_CSV=false`
     - `PORT=5000`
     - `NODE_ENV=production`

**Frontend Deployment:**
4. Create a **Static Site** for frontend:
   - Root directory: `frontend`
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
   - Add environment variable:
     - `VITE_API_URL` = (your backend service URL, e.g., `https://your-app.onrender.com/api`)

**Alternative Platforms:**
- **Backend**: Railway, Heroku, AWS Elastic Beanstalk
- **Frontend**: Vercel, Netlify, GitHub Pages

