import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SalesTable from './components/SalesTable';
import Pagination from './components/Pagination';
import Sidebar from './components/Sidebar';
import StatsCards from './components/StatsCards';
import { useSalesData } from './hooks/useSalesData';

function App() {
  const {
    data,
    meta,
    loading,
    error,
    params,
    actions
  } = useSalesData();

  return (
    <div className="min-h-screen bg-white flex font-sans text-gray-900">
      {/* 1. Sidebar */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* Header Section */}
        <header className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <h2 className="text-xl font-semibold text-gray-800">Sales Management System</h2>
          <div className="w-96">
            <SearchBar
              value={params.search}
              onChange={actions.setSearch}
              placeholder="Name, Phone no."
            />
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-white p-6">

          {/* Filter Bar & Sort */}
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6">
            <div className="flex-1">
              <FilterPanel
                filters={params.filters}
                onChange={actions.setFilters}
              />
            </div>

            {/* Sort Dropdown - Minimalist */}
            <div className="flex items-center gap-2 min-w-fit">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                value={params.sort || ''}
                onChange={(e) => actions.setSort(e.target.value)}
                className="border-none bg-transparent text-sm font-medium text-gray-700 focus:ring-0 cursor-pointer"
              >
                <option value="Customer Name:asc">Customer Name (A-Z)</option>
                <option value="Customer Name:desc">Customer Name (Z-A)</option>
                <option value="Date:desc">Date (Newest)</option>
                <option value="Date:asc">Date (Oldest)</option>
                <option value="Quantity:desc">Quantity (High)</option>
                <option value="Quantity:asc">Quantity (Low)</option>
              </select>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              <strong>Error: </strong> {error}
            </div>
          )}

          {/* Stats Cards */}
          <StatsCards data={data} />

          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden mb-4">
            <SalesTable
              data={data}
              loading={loading}
              sort={params.sort}
              onSort={actions.setSort}
            />
          </div>

          {/* Pagination */}
          <Pagination
            meta={meta}
            onPageChange={actions.setPage}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
