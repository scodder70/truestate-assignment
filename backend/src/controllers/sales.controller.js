const salesService = require('../services/sales.service.mongo');

const getSales = async (req, res) => {
    try {
        const { q, page, limit, sort, ...filters } = req.query;

        // Construct filter object
        const activeFilters = {};
        const knownParams = ['q', 'page', 'limit', 'sort'];

        Object.keys(req.query).forEach(key => {
            if (!knownParams.includes(key)) {
                // It's a filter
                activeFilters[key] = req.query[key];
            }
        });

        const result = await salesService.getAllSales({
            q,
            filters: activeFilters,
            sort,
            page: page || 1,
            limit: limit || 10
        });

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getFilterOptions = (req, res) => {
    // Helper endpoint to get unique values for filters (optional but good for UI)
    try {
        const { field } = req.params;
        const values = salesService.getUniqueValues(field);
        res.json(values);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching filter options' });
    }
}

module.exports = {
    getSales,
    getFilterOptions
};
