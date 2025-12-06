import { useState, useEffect, useCallback } from 'react';
import { fetchSales } from '../services/api';

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
            const result = await fetchSales({ q: search, filters, sort, page });
            setData(result.data);
            setMeta(result.meta);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [search, filters, sort, page]);

    useEffect(() => {
        // Debounce search could be handled here or in the component.
        // implementing simple debounce for search if it changes rapidly?
        // For now, relying on useEffect.
        const timer = setTimeout(() => {
            loadData();
        }, 300); // 300ms debounce
        return () => clearTimeout(timer);
    }, [loadData]); // loadData changes when deps change

    return {
        data,
        meta,
        loading,
        error,
        params: { search, filters, sort, page },
        actions: { setSearch, setFilters, setSort, setPage }
    };
};
