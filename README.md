# Retail Sales Management System

## Overview
A full-stack Retail Sales Management System designed to demonstrate professional software engineering capabilities. The application provides authorized users with a dashboard to view sales data, performing advanced operations like full-text search, multi-faceted filtering, sorting, and pagination. It features a responsive React frontend and a robust Node.js backend.

## Tech Stack
- **Frontend**: React (Vite), TailwindCSS
- **Backend**: Node.js, Express.js
- **Data**: In-Memory JSON Service (Mock Data)

## Search Implementation Summary
Search is implemented efficiently on the backend using case-insensitive string matching. It filters against both `Customer Name` and `Phone Number` fields. Debouncing is handled on the frontend (300ms) to ensure performance and reduce unnecessary API calls during typing.

## Filter Implementation Summary
Server-side filtering supports multiple concurrent criteria. It handles:
- **Multi-select** for Region, Gender, Category, and Payment Method (OR logic within fields, AND logic between fields).
- **Date Range** parsing for start/end date filtering.
- **Tags** array overlap matching.
- **Age Range** logic to parse and match numeric scopes (e.g., "18-25").

## Sorting Implementation Summary
Sorting is handled dynamically on the server via query parameters (`sort=Field:Order`). It supports sorting by Date, Quantity, and Customer Name. Special handling checks for Date objects and Case-Insensitive string comparisons to ensure accurate ordering.

## Pagination Implementation Summary
Server-side pagination ensures scalability. The API accepts `page` and `limit` parameters, returning the specific slice of the dataset along with metadata (total items, total pages) to generate platform-agnostic pagination controls on the frontend.

## Setup Instructions
1. **Download Dataset**:
   Download the CSV file from [Google Drive](https://drive.google.com/file/d/1tzbyuxBmrBwMSXbL22r33FUMtO0V_lxb/view?usp=sharing) and save it as `truestate_assignment_dataset.csv` in the `backend/data` directory.

2. **Install Dependencies**:
   Run `npm run install:all` in the root directory.
   *(Or running `npm install` separately in `/backend` and `/frontend`)*

3. **Start Application**:
   Run `npm run dev` in the root directory.
   - Backend will start on `http://localhost:5000`
   - Frontend will start on `http://localhost:5173`

4. **Access**:
   Open your browser to `http://localhost:5173`.
   **Note:** Please wait for the data to load initially (approximately 10 seconds). The application will display a loading spinner while the CSV dataset is being processed.

