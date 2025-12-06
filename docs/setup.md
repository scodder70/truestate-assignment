# Setup & Run Instructions

## Prerequisites
- Node.js (v14+)
- npm (v6+)

## Quick Start
1. **Clone the repository** (if you haven't)
2. **Install all dependencies**:
   Open a terminal in the root directory and run:
   ```bash
   npm run install:all
   ```
   *This installs dependencies for root, backend, and frontend.*

3. **Start the Application**:
   Run the following command in the root directory:
   ```bash
   npm run dev
   ```
   *This will start both the Backend (port 5000) and Frontend (port 5173).*

4. **Access the App**:
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Manual Setup (Alternative)
If you prefer to run them separately:

### Backend
1. `cd backend`
2. `npm install`
3. `npm start`
   - Server runs on http://localhost:5000

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`
   - App runs on http://localhost:5173

## Troubleshooting
- **Ports occupied**: Ensure ports 5000 and 5173 are free.
- **Data not loading**: Verify backend is running.
- **Build errors**: Ensure you have installed dependencies correctly.
