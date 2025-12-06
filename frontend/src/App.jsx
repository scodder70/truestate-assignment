import React from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SalesTable from './components/SalesTable';
import Pagination from './components/Pagination';
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Retail Sales Management
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage sales transactions, customers, and inventory stats.
          </p>
        </header>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            <p className="text-sm mt-1">Make sure the backend server is running on port 5000.</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar: Filters */}
          <aside className="w-full lg:w-1/4">
            <FilterPanel
              filters={params.filters}
              onChange={actions.setFilters}
            />
          </aside>

          {/* Main Content: Search + Table */}
          <main className="w-full lg:w-3/4">
            <SearchBar
              value={params.search}
              onChange={actions.setSearch}
            />

            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">
                  Sort by clicking on table headers
                </span>
              </div>

              <SalesTable
                data={data}
                loading={loading}
                sort={params.sort}
                onSort={actions.setSort}
              />

              <div className="mt-4">
                <Pagination
                  meta={meta}
                  onPageChange={actions.setPage}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
