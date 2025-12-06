import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const CopyButton = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e) => {
        e.stopPropagation(); // Prevent row click if any
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="focus:outline-none transition-colors"
            title={copied ? "Copied!" : "Copy to clipboard"}
        >
            {copied ? (
                <Check size={14} className="text-green-500" />
            ) : (
                <Copy size={14} className="text-gray-400 hover:text-blue-500" />
            )}
        </button>
    );
};

const SalesTable = ({ data, loading, sort, onSort }) => {
    const getSortIcon = (field) => {
        if (!sort) return null;
        const [sortField, order] = sort.split(':');
        if (sortField !== field) return null;
        return order === 'asc' ? '↑' : '↓';
    };

    const handleSort = (field) => {
        let newOrder = 'asc';
        if (sort) {
            const [sortField, currentOrder] = sort.split(':');
            if (sortField === field && currentOrder === 'asc') {
                newOrder = 'desc';
            }
        }
        onSort(`${field}:${newOrder}`);
    };

    const HeaderCell = ({ label, sortKey, align = 'left' }) => (
        <th
            onClick={() => sortKey && handleSort(sortKey)}
            className={`px-6 py-4 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors text-${align}`}
        >
            <div className={`flex items-center ${align === 'right' ? 'justify-end' : ''} gap-1`}>
                {label}
                {sortKey && <span>{getSortIcon(sortKey)}</span>}
            </div>
        </th>
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 bg-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="flex justify-center items-center h-64 bg-white">
                <p className="text-gray-500 text-sm">No records found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
                <thead>
                    <tr>
                        <HeaderCell label="Transaction ID" />
                        <HeaderCell label="Date" sortKey="Date" />
                        <HeaderCell label="Customer ID" />
                        <HeaderCell label="Customer Name" sortKey="Customer Name" />
                        <HeaderCell label="Phone Number" />
                        <HeaderCell label="Gender" />
                        <HeaderCell label="Age" />
                        <HeaderCell label="Product Category" />
                        <HeaderCell label="Quantity" sortKey="Quantity" align="right" />
                        <HeaderCell label="Total Amount" align="right" />
                        <HeaderCell label="Customer Region" />
                        <HeaderCell label="Product ID" />
                        <HeaderCell label="Employee Name" />
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {data.map((row) => (
                        <tr key={row['Transaction ID'] || Math.random()} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {row['Transaction ID']}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(row.Date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                {row['Customer ID']}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {row['Customer Name']}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    {row['Phone Number']}
                                    <CopyButton text={row['Phone Number']} />
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {row['Gender']}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {row['Age']}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                {row['Product Category']}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium text-right">
                                {row['Quantity'] < 10 ? `0${row['Quantity']}` : row['Quantity']}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium text-right">
                                ₹ {Number(row['Total Amount']).toLocaleString('en-IN')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                {row['Customer Region']}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {row['Product ID']}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                {row['Employee Name']}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTable;
