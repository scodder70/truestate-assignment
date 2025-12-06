const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

async function connectDB() {
    try {
        // Only disable SSL verification in development (Windows OpenSSL issue)
        if (process.env.NODE_ENV === 'development') {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        }
        
        await mongoose.connect(uri);
        
        console.log('✓ Connected to MongoDB successfully');
        return mongoose.connection.db;
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
}

function getDB() {
    if (!mongoose.connection.db) {
        throw new Error('Database not initialized. Call connectDB first.');
    }
    return mongoose.connection.db;
}

async function closeDB() {
    if (mongoose.connection) {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

module.exports = { connectDB, getDB, closeDB };
