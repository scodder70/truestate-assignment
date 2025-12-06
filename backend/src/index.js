require('dotenv').config();
const express = require('express');
const cors = require('cors');
const salesRoutes = require('./routes/sales.routes');
const { connectDB } = require('./config/database.mongoose');
const { importCSVToMongoDB } = require('./utils/importData');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sales', salesRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('Retail Sales Management System API is running');
});

// Start Server
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        
        // Import CSV data to MongoDB (only needed once or on updates)
        // Comment this out after first run if you don't want to re-import
        if (process.env.IMPORT_CSV === 'true') {
            console.log('Importing CSV data to MongoDB...');
            await importCSVToMongoDB();
        }
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

startServer();

// Export for Vercel serverless
module.exports = app;
