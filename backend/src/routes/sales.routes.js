const express = require('express');
const router = express.Router();
const salesController = require('../controllers/sales.controller');

router.get('/', salesController.getSales);
// Optional: Endpoint to get dynamic filter options
// e.g. /api/sales/options/Brand -> returns all brands
router.get('/options/:field', salesController.getFilterOptions);

module.exports = router;
