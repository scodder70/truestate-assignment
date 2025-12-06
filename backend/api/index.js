require('dotenv').config();
const express = require('express');
const cors = require('cors');
const salesRoutes = require('../src/routes/sales.routes');
const { connectDB } = require('../src/config/database.mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sales', salesRoutes);

// Health Check
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Retail Sales Management System API is running' });
});

app.get('/api', (req, res) => {
    res.json({ status: 'ok', message: 'API endpoint' });
});

// Database connection promise
let dbConnected = false;

const handler = async (req, res) => {
    try {
        // Connect to database if not already connected
        if (!dbConnected) {
            await connectDB();
            dbConnected = true;
        }
        
        // Handle the request
        return app(req, res);
    } catch (error) {
        console.error('Handler error:', error);
        return res.status(500).json({ 
            error: 'Internal Server Error',
            message: error.message 
        });
    }
};

// Export for Vercel
module.exports = handler;
