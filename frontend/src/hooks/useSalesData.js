import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useSalesData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState({});

    // State for query params
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Build query params
            const params = new URLSearchParams();
            if (search) params.append('q', search);
            if (page) params.append('page', page);
            params.append('limit', 10);
            if (sort) params.append('sort', sort);

            // Add filters
            if (filters) {
                Object.keys(filters).forEach(key => {
                    if (filters[key]) {
                        if (Array.isArray(filters[key])) {
                            filters[key].forEach(val => params.append(key, val));
                        } else {
                            params.append(key, filters[key]);
                        }
                    }
                });
            }

            const url = `${API_BASE_URL}/sales?${params.toString()}`;
            console.log('Fetching from:', url);

            // Fetch data using native fetch
            const response = await fetch(url);
            
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
            }
            
            const result = await response.json();
            console.log('Received data:', { 
                dataCount: result.data?.length, 
                totalItems: result.meta?.totalItems 
            });
            
            setData(result.data || []);
            setMeta(result.meta || {});
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message);
            setData([]);
            setMeta({});
        } finally {
            setLoading(false);
        }
    }, [search, filters, sort, page]);

    useEffect(() => {
        const timer = setTimeout(() => {
            loadData();
        }, 300);
        return () => clearTimeout(timer);
    }, [loadData]);

    return {
        data,
        meta,
        loading,
        error,
        params: { search, filters, sort, page },
        actions: { setSearch, setFilters, setSort, setPage }
    };
};
