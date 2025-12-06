import React from 'react';

const FilterPanel = ({ filters, onChange }) => {
    // Pre-defined options based on mock data
    const regions = ['North', 'South', 'East', 'West'];
    const genders = ['Male', 'Female'];
    const categories = ['Electronics', 'Fitness', 'Footwear', 'Office', 'Home & Kitchen'];

    const handleCheckboxChange = (category, value) => {
        const currentValues = filters[category] || [];
        let newValues;
        if (currentValues.includes(value)) {
            newValues = currentValues.filter(v => v !== value);
        } else {
            newValues = [...currentValues, value];
        }

        onChange({ ...filters, [category]: newValues });
    };

    const FilterGroup = ({ title, options, filterKey }) => (
        <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
            <div className="space-y-1">
                {options.map(opt => (
                    <label key={opt} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={(filters[filterKey] || []).includes(opt)}
                            onChange={() => handleCheckboxChange(filterKey, opt)}
                            className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-600 text-sm">{opt}</span>
                    </label>
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Filters</h2>

            <FilterGroup title="Region" options={regions} filterKey="Customer Region" />
            <FilterGroup title="Gender" options={genders} filterKey="Gender" />
            <FilterGroup title="Category" options={categories} filterKey="Product Category" />

            {/* Add more filters as needed */}

            <button
                onClick={() => onChange({})}
                className="w-full mt-4 py-2 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors"
            >
                Reset Filters
            </button>
        </div>
    );
};

export default FilterPanel;
