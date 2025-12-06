import React from 'react';

const SalesTable = ({ data, loading, sort, onSort }) => {
    const getSortIcon = (field) => {
        if (!sort) return '↕️';
        const [sortField, order] = sort.split(':');
        if (sortField !== field) return '↕️';
        return order === 'asc' ? '↑' : '↓';
    };

    const handleSort = (field) => {
        // Toggle sort order
        let newOrder = 'asc';
        if (sort) {
            const [sortField, currentOrder] = sort.split(':');
            if (sortField === field && currentOrder === 'asc') {
                newOrder = 'desc';
            }
        }
        onSort(`${field}:${newOrder}`);
    };

    const headers = [
        { label: 'Date', key: 'Date' },
        { label: 'Customer Name', key: 'Customer Name' },
        { label: 'Product', key: 'Product Name' },
        { label: 'Region', key: 'Customer Region' },
        { label: 'Category', key: 'Product Category' },
        { label: 'Qty', key: 'Quantity' },
        { label: 'Total', key: 'Total Amount' },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow">
                <p className="text-gray-500">No sales records found.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th
                                key={header.key}
                                onClick={() => handleSort(header.key)}
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                            >
                                <div className="flex items-center space-x-1">
                                    <span>{header.label}</span>
                                    <span className="text-gray-400">{getSortIcon(header.key)}</span>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row['Sale ID']} className="hover:bg-gray-50 transition-colors">
                            <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                {new Date(row.Date).toLocaleDateString()}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 text-sm font-medium text-gray-900">
                                {row['Customer Name']}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 text-sm text-gray-700">
                                {row['Product Name']}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 text-sm text-gray-600">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {row['Customer Region']}
                                </span>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 text-sm text-gray-600">
                                {row['Product Category']}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 text-sm text-gray-700">
                                {row.Quantity}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 text-sm font-bold text-gray-800">
                                ${row['Total Amount']}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTable;
