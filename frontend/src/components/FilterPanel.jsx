import React, { useState } from 'react';
import { ChevronDown, Calendar, RefreshCcw } from 'lucide-react';

const FilterPanel = ({ filters, onChange }) => {
    // Options (Hardcoded for UI, should be dynamic in prod)
    const regions = ['North', 'South', 'East', 'West'];
    const genders = ['Male', 'Female'];
    const categories = ['Electronics', 'Clothing', 'Beauty', 'Home', 'Books'];
    const ageRanges = ['18-25', '26-35', '36-45', '46-60', '60+'];
    const paymentMethods = ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Cash'];
    const tags = ['organic', 'skincare', 'sale', 'new']; // Example tags

    // Helper to toggle array values
    const toggleFilter = (key, value) => {
        const current = filters[key] || [];
        const updated = current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value];
        onChange({ ...filters, [key]: updated });
    };

    const FilterDropdown = ({ title, options, filterKey }) => {
        const [isOpen, setIsOpen] = useState(false);
        const dropdownRef = React.useRef(null);
        const activeCount = (filters[filterKey] || []).length;

        // Close on click outside
        React.useEffect(() => {
            const handleClickOutside = (event) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setIsOpen(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        return (
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center space-x-2 border px-3 py-1.5 rounded-md text-sm hover:bg-gray-100 transition-colors ${activeCount > 0 ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-700'
                        }`}
                >
                    <span>{title} {activeCount > 0 && `(${activeCount})`}</span>
                    <ChevronDown size={14} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Content */}
                {isOpen && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-2 animate-in fade-in zoom-in-95 duration-100">
                        <div className="space-y-1 max-h-64 overflow-y-auto custom-scrollbar">
                            {options.map(opt => (
                                <label key={opt} className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={(filters[filterKey] || []).includes(opt)}
                                        onChange={() => toggleFilter(filterKey, opt)}
                                        className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-gray-300"
                                    />
                                    <span className="text-sm text-gray-700 font-medium">{opt}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-wrap items-center gap-2 mb-4">
            {/* Reset Button */}
            <button
                onClick={() => onChange({})}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-md border border-transparent hover:border-gray-200"
                title="Reset Filters"
            >
                <RefreshCcw size={18} />
            </button>

            <FilterDropdown title="Customer Region" options={regions} filterKey="Customer Region" />
            <FilterDropdown title="Gender" options={genders} filterKey="Gender" />
            <FilterDropdown title="Age Range" options={ageRanges} filterKey="Age Range" />
            <FilterDropdown title="Product Category" options={categories} filterKey="Product Category" />
            <FilterDropdown title="Tags" options={tags} filterKey="Tags" />
            <FilterDropdown title="Payment Method" options={paymentMethods} filterKey="Payment Method" />

            {/* Date Placeholder */}
            <div className="relative">
                <button className="flex items-center space-x-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                    <span>Date</span>
                    <ChevronDown size={14} className="text-gray-500" />
                </button>
            </div>

        </div>
    );
};

export default FilterPanel;
