# Deployment Instructions

## Overview
This application consists of a **Node.js Backend** and a **React Frontend**.
You can deploy them separately or together depending on your hosting provider.

## Option 1: Free Hosting (Render / Vercel)

### Backend (Render.com)
1. Push your code to a GitHub repository.
2. Sign up on [Render](https://render.com).
3. Create a **New Web Service**.
4. Connect your valid GitHub repository.
5. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Deploy. Copy the **Service URL** (e.g., `https://my-api.onrender.com`).

### Frontend (Vercel)
1. Sign up on [Vercel](https://vercel.com).
2. Create a **New Project**.
3. Import your GitHub repository.
4. Settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Environment Variables**:
   - Add a variable `VITE_API_BASE_URL` with the value of your Backend Service URL.
   *(Note: You might need to update client code to use `import.meta.env.VITE_API_BASE_URL` instead of hardcoded localhost if not already done)*

## Option 2: VPS / VM
1. Provision a server (Ubuntu/Linux).
2. Install Node.js and Nginx.
3. Clone the repo.
4. Build frontend: `cd frontend && npm install && npm run build`.
5. Serve `frontend/dist` with Nginx.
6. Run backend with **PM2**: `cd backend && pm2 start src/index.js`.
7. Configure Nginx to proxy API requests to `localhost:5000`.

## Important Note (Hardcoded URL)
Currently, `src/services/api.js` connects to `http://localhost:5000/api`.
**Before deploying**, update `frontend/src/services/api.js`:
```javascript
// Change this line:
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```
And ensure your `.env` or environment variables are set correctly in the deployment platform.
