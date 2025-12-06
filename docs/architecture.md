# Architecture Document

## Overview
The Retail Sales Management System is a full-stack web application designed to manage and visualize sales data. It follows a client-server architecture with a clear separation of concerns.

## Tech Stack
- **Frontend**: React (Vite), TailwindCSS, Axios (or Fetch API)
- **Backend**: Node.js, Express.js
- **Database**: In-Memory JSON (Mock Data)

## Backend Architecture
The backend is structured using a Layered Architecture:
1. **Controller Layer**: Handles HTTP requests, input validation, and response formatting.
2. **Service Layer**: Contains business logic (search, filter, sort, pagination) and data manipulation.
3. **Data Layer**: Direct access to the data source (sales.json).

### Data Flow
`Request -> Router -> Controller -> Service -> Data Source -> Service -> Controller -> Response`

### Key Modules
- `sales.routes.js`: Defines API endpoints.
- `sales.controller.js`: Parses Query Parameters (`q`, `filters`, `sort`).
- `sales.service.js`: Implements the core logic for filtering and sorting arrays in memory.

## Frontend Architecture
The frontend is built with React using Functional Components and Hooks.

### Component Structure
- **App.jsx**: Main container, manages global state (search, filters, data) via `useSalesData` hook.
- **FilterPanel.jsx**: Sidebar component for multi-select filters.
- **SearchBar.jsx**: Input component for text search.
- **SalesTable.jsx**: Grid display of sales data with sortable headers.
- **Pagination.jsx**: Controls for navigating pages.

### Data Flow
1. User interacts with UI (types in Search, clicks Filter).
2. `useSalesData` hook updates state strings.
3. `useEffect` triggers data fetch from Backend API.
4. Backend returns filtered/sorted data.
5. UI re-renders with new data.

## Folder Structure
```
root/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   └── index.js
│   └── data/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── App.jsx
│   └── public/
└── docs/
```
