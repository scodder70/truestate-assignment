import React from 'react';

const SearchBar = ({ value, onChange }) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search by Customer Name or Phone..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
        </div>
    );
};

export default SearchBar;
