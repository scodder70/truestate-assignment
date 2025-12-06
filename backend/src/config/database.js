const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
let client;
let db;

async function connectDB() {
    try {
        // Disable strict SSL for MongoDB connection
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        
        client = new MongoClient(uri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        await client.connect();
        
        // Verify connection
        await client.db().admin().ping();
        
        db = client.db('retail-sales');
        console.log('✓ Connected to MongoDB successfully');
        return db;
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
}

function getDB() {
    if (!db) {
        throw new Error('Database not initialized. Call connectDB first.');
    }
    return db;
}

async function closeDB() {
    if (client) {
        await client.close();
        console.log('MongoDB connection closed');
    }
}

module.exports = { connectDB, getDB, closeDB };
