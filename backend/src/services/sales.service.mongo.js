const { getDB } = require('../config/database.mongoose');

class SalesService {
    getCollection() {
        const db = getDB();
        return db.collection('truestate-assn');
    }

    // Get all sales with filtering, search, sorting, and pagination
    async getAllSales({ q, filters, sort, page = 1, limit = 10 }) {
        const collection = this.getCollection();
        
        // Build query
        const query = {};

        // 1. Search (Customer Name, Phone Number)
        if (q) {
            query.$or = [
                { 'Customer Name': { $regex: q, $options: 'i' } },
                { 'Phone Number': { $regex: q } }
            ];
        }

        // 2. Filters
        if (filters && Object.keys(filters).length > 0) {
            Object.keys(filters).forEach(key => {
                let filterValue = filters[key];
                if (!filterValue || filterValue.length === 0) return;

                // Normalize to array
                if (!Array.isArray(filterValue)) {
                    filterValue = [filterValue];
                }

                if (key === 'Age Range') {
                    const ageConditions = filterValue.map(range => {
                        if (range.endsWith('+')) {
                            return { Age: { $gte: parseInt(range) } };
                        }
                        const [min, max] = range.split('-').map(Number);
                        return { Age: { $gte: min, $lte: max } };
                    });
                    if (!query.$or) query.$or = [];
                    query.$and = query.$and || [];
                    query.$and.push({ $or: ageConditions });
                } else if (key === 'Date Range') {
                    const rangeStr = filterValue[0];
                    if (rangeStr && rangeStr.includes('|')) {
                        const [start, end] = rangeStr.split('|');
                        query.Date = {
                            $gte: new Date(start),
                            $lte: new Date(end)
                        };
                    }
                } else if (key === 'Tags') {
                    query.Tags = { $in: filterValue };
                } else if (key === 'Region') {
                    query['Customer Region'] = { $in: filterValue };
                } else if (key === 'Gender') {
                    query['Gender'] = { $in: filterValue };
                } else if (key === 'Category') {
                    query['Product Category'] = { $in: filterValue };
                } else if (key === 'Payment Method') {
                    query['Payment Method'] = { $in: filterValue };
                }
            });
        }

        // 3. Sorting
        let sortOption = {};
        if (sort) {
            const [field, order] = sort.split(':');
            sortOption[field] = order === 'asc' ? 1 : -1;
        } else {
            sortOption['Date'] = -1; // Default sort
        }

        // 4. Pagination
        const skip = (page - 1) * limit;

        try {
            const [data, total] = await Promise.all([
                collection.find(query).sort(sortOption).skip(skip).limit(parseInt(limit)).toArray(),
                collection.countDocuments(query)
            ]);

            return {
                data,
                meta: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / limit),
                    totalItems: total,
                    itemsPerPage: parseInt(limit)
                }
            };
        } catch (error) {
            console.error('Error fetching sales data:', error);
            throw error;
        }
    }

    // Get statistics
    async getStats() {
        const collection = this.getCollection();
        
        try {
            const stats = await collection.aggregate([
                {
                    $group: {
                        _id: null,
                        totalQuantity: { $sum: '$Quantity' },
                        totalAmount: { $sum: '$Total Amount' },
                        totalDiscount: { $sum: { $subtract: ['$Total Amount', '$Final Amount'] } },
                        count: { $sum: 1 }
                    }
                }
            ]).toArray();

            return stats[0] || {
                totalQuantity: 0,
                totalAmount: 0,
                totalDiscount: 0,
                count: 0
            };
        } catch (error) {
            console.error('Error fetching stats:', error);
            throw error;
        }
    }
}

module.exports = new SalesService();
