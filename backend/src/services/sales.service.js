const salesData = require('../../data/sales.json');

class SalesService {
    constructor() {
        this.data = salesData;
    }

    // Get all sales with filtering, search, sorting, and pagination
    getAllSales({ q, filters, sort, page = 1, limit = 10 }) {
        let results = [...this.data];

        // 1. Search (Customer Name, Phone Number)
        if (q) {
            const lowerQ = q.toLowerCase();
            results = results.filter(item =>
                item['Customer Name'].toLowerCase().includes(lowerQ) ||
                item['Phone Number'].includes(q)
            );
        }

        // 2. Filters
        if (filters) {
            // Expected filters format: { 'Customer Region': ['North', 'South'], 'Gender': ['Male'], 'Age Range': '20-30' }
            // Note: In a real query param, this might come as stringified JSON or separate params. 
            // We will assume the controller parses it into a nice object for us.


            // Implement filtering logic
            Object.keys(filters).forEach(key => {
                const filterValue = filters[key];
                if (!filterValue || filterValue.length === 0) return;

                if (key === 'Age Range') {
                    // Example: "20-30" or "60+"
                    // Handling range logic
                    // For simplicity, let's assume specific ranges
                } else if (Array.isArray(filterValue)) {
                    // Multi-select
                    results = results.filter(item => filterValue.includes(item[key]));
                }
            });

            // TODO: Refine filter logic in Controller -> Service interface
        }

        // 3. Sorting
        if (sort) {
            const [field, order] = sort.split(':'); // e.g. "Date:desc"

            results.sort((a, b) => {
                let valA = a[field];
                let valB = b[field];

                // Handle specific types
                if (field === 'Date') {
                    valA = new Date(valA).getTime();
                    valB = new Date(valB).getTime();
                } else if (typeof valA === 'string') {
                    valA = valA.toLowerCase();
                    valB = valB.toLowerCase();
                }

                if (valA < valB) return order === 'asc' ? -1 : 1;
                if (valA > valB) return order === 'asc' ? 1 : -1;
                return 0;
            });
        }

        // 4. Pagination
        const totalItems = results.length;
        const totalPages = Math.ceil(totalItems / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + Number(limit);
        const paginatedResults = results.slice(startIndex, endIndex);

        return {
            data: paginatedResults,
            meta: {
                totalItems,
                totalPages,
                currentPage: Number(page),
                itemsPerPage: Number(limit)
            }
        };
    }

    getUniqueValues(field) {
        if (!this.data.length) return [];
        // Handle array fields like Tags
        if (Array.isArray(this.data[0][field])) {
            const allTags = this.data.flatMap(item => item[field] || []);
            return [...new Set(allTags)];
        }
        return [...new Set(this.data.map(item => item[field]))];
    }
}

module.exports = new SalesService();
