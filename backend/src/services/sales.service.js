const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

class SalesService {
    constructor() {
        this.data = [];
        this.loaded = false;
    }

    async loadData() {
        return new Promise((resolve, reject) => {
            const results = [];
            const csvPath = path.join(__dirname, '../../data/truestate_assignment_dataset.csv');

            console.log('Loading data from CSV...', csvPath);

            fs.createReadStream(csvPath)
                .pipe(csv())
                .on('data', (data) => {
                    // Transform data as needed to match expected types
                    // Clean up Tags from string "tag1,tag2" to array ["tag1", "tag2"]
                    if (data.Tags) {
                        data.Tags = data.Tags.split(',').map(t => t.trim());
                    } else {
                        data.Tags = [];
                    }

                    // Convert numeric fields
                    data.Age = Number(data.Age);
                    data.Quantity = Number(data.Quantity);
                    data['Price per Unit'] = Number(data['Price per Unit']);
                    data['Total Amount'] = Number(data['Total Amount']);
                    data['Final Amount'] = Number(data['Final Amount']);
                    data['Discount Percentage'] = Number(data['Discount Percentage']);

                    results.push(data);
                })
                .on('end', () => {
                    this.data = results;
                    this.loaded = true;
                    console.log(`Successfully loaded ${this.data.length} records.`);
                    resolve();
                })
                .on('error', (err) => {
                    console.error('Error loading CSV:', err);
                    reject(err);
                });
        });
    }

    // Get all sales with filtering, search, sorting, and pagination
    getAllSales({ q, filters, sort, page = 1, limit = 10 }) {
        let results = [...this.data];

        // 1. Search (Customer Name, Phone Number)
        if (q) {
            const lowerQ = q.toLowerCase();
            results = results.filter(item =>
                (item['Customer Name'] && item['Customer Name'].toLowerCase().includes(lowerQ)) ||
                (item['Phone Number'] && item['Phone Number'].includes(q))
            );
        }

        // 2. Filters
        if (filters) {
            // Implement filtering logic
            Object.keys(filters).forEach(key => {
                let filterValue = filters[key];
                if (!filterValue || filterValue.length === 0) return;

                // Normalize to array for consistent handling
                if (!Array.isArray(filterValue)) {
                    filterValue = [filterValue];
                }

                if (key === 'Age Range') {
                    // Example: "20-30" or "60+"
                    const matchesAge = (age, range) => {
                        if (!age) return false;
                        if (range.endsWith('+')) {
                            return age >= parseInt(range);
                        }
                        const [min, max] = range.split('-').map(Number);
                        return age >= min && age <= max;
                    };

                    results = results.filter(item =>
                        filterValue.some(range => matchesAge(item.Age, range))
                    );
                } else if (key === 'Date Range') {
                    const rangeStr = filterValue[0];
                    if (rangeStr && rangeStr.includes('|')) {
                        const [start, end] = rangeStr.split('|');
                        const startDate = new Date(start).getTime();
                        const endDate = new Date(end).getTime();

                        results = results.filter(item => {
                            const itemDate = new Date(item.Date).getTime();
                            return itemDate >= startDate && itemDate <= endDate;
                        });
                    }
                } else {
                    // Exact match for other fields (Region, Gender, Category, Payment Method, Tags)
                    results = results.filter(item => {
                        const itemValue = item[key];
                        // Handle array fields in data (e.g. Tags)
                        if (Array.isArray(itemValue)) {
                            return itemValue.some(tag => filterValue.some(f => f.toLowerCase() === tag.toLowerCase()));
                        }
                        // Handle standard string fields
                        if (typeof itemValue === 'string') {
                            return filterValue.some(f => f.toLowerCase() === itemValue.toLowerCase());
                        }
                        // Fallback for non-strings
                        if (itemValue === undefined || itemValue === null) return false;
                        return filterValue.includes(itemValue);
                    });
                }
            });
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
