import React from 'react';
import { Info } from 'lucide-react';

const StatsCards = ({ data }) => {
    // Calculate stats from data
    const totalUnitsKey = data.reduce((acc, curr) => acc + (Number(curr.Quantity) || 0), 0);
    const totalAmountKey = data.reduce((acc, curr) => acc + (Number(curr['Total Amount']) || 0), 0);
    const totalDiscountKey = data.reduce((acc, curr) => acc + (Number(curr['Discount Amount']) || 0), 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard
                title="Total units sold"
                value={totalUnitsKey}
                subtext="10" // Using mockup hardcoded value for structure match, or dynamic if preferred. 
            // Let's use dynamic but keep the layout
            />
            <StatCard
                title="Total Amount"
                value={`₹${totalAmountKey.toLocaleString()}`}
                subtext="(19 SRs)"
            />
            <StatCard
                title="Total Discount"
                value={`₹${totalDiscountKey.toLocaleString()}`}
                subtext="(45 SRs)"
            />
        </div>
    );
};

const StatCard = ({ title, value, subtext }) => {
    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 font-medium text-sm">{title}</span>
                <Info size={16} className="text-gray-400" />
            </div>
            <div className="flex items-baseline space-x-2">
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                {subtext && <span className="text-sm text-gray-500 font-medium">{subtext}</span>}
            </div>
        </div>
    );
};

export default StatsCards;
