const express = require('express');
const cors = require('cors');
const salesRoutes = require('./routes/sales.routes');

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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
