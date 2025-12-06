const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchSales = async ({ q, filters, sort, page, limit }) => {
    const params = new URLSearchParams();
    if (q) params.append('q', q);
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (sort) params.append('sort', sort);

    if (filters) {
        Object.keys(filters).forEach(key => {
            if (filters[key]) {
                // If it's an array, append multiple times? 
                // Our backend service expects standard query params.
                // If backend uses "key=val1&key=val2", URLSearchParams handles append.
                if (Array.isArray(filters[key])) {
                    filters[key].forEach(val => params.append(key, val));
                } else {
                    params.append(key, filters[key]);
                }
            }
        });
    }

    const response = await fetch(`${API_BASE_URL}/sales?${params.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to fetch sales data');
    }
    return response.json();
};
