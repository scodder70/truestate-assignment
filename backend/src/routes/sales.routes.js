const express = require('express');
const router = express.Router();
const salesController = require('../controllers/sales.controller');
const { getDB } = require('../config/database.mongoose');

router.get('/', salesController.getSales);

// Debug endpoint to check database
router.get('/debug/count', async (req, res) => {
    try {
        const db = getDB();
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);
        
        // Check count in each collection
        const counts = {};
        for (const name of collectionNames) {
            counts[name] = await db.collection(name).countDocuments({});
        }
        
        // Get sample from truestate-assn
        const sample = await db.collection('truestate-assn').findOne({});
        
        res.json({ 
            allCollections: collectionNames,
            counts,
            sampleRecord: sample,
            currentCollectionInUse: 'truestate-assn'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Optional: Endpoint to get dynamic filter options
// e.g. /api/sales/options/Brand -> returns all brands
router.get('/options/:field', salesController.getFilterOptions);

module.exports = router;
