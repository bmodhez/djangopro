# Django React Dashboard Setup

## Project Structure
```
├── djangopro/           # Django backend (runs on :3000)
│   ├── api/            # API endpoints
│   └── manage.py       # Django management
├── frontend/           # React frontend (runs on :3001)
│   ├── src/           # React components
│   └── package.json   # Frontend dependencies
└── package.json       # Root project config
```

## Quick Start

### 1. Django Backend (Port 3000)
The Django backend is already running and includes:
- API endpoints at `/api/transactions/` and `/api/dashboard/`
- Admin panel at `/admin/`
- Sample data for testing

### 2. React Frontend (Port 3001)
To start the React dashboard:
```bash
npm run frontend
```

Or manually:
```bash
cd frontend
npm run dev
```

### 3. Access the Dashboard
- React Dashboard: http://localhost:3001
- Django API: http://localhost:3000/api/
- Django Admin: http://localhost:3000/admin/

## Features Implemented

✅ **Responsive Dashboard Layout**
- Navbar with mobile hamburger menu
- Collapsible sidebar navigation
- Mobile-responsive design

✅ **Summary Cards**
- Total Income display
- Total Expense display  
- Savings calculation

✅ **Transactions Table**
- Fetches data from `/api/transactions/`
- Displays recent transactions
- Color-coded amounts (green for income, red for expense)
- Fallback to sample data if API unavailable

✅ **Pie Chart - Expense Breakdown**
- Visual breakdown of expenses by category
- Interactive tooltips
- Color-coded categories
- Legend with values

✅ **Bar Chart - Monthly Trends**
- Monthly income vs expense comparison
- Interactive tooltips
- Summary statistics below chart

✅ **Django API Integration**
- RESTful API endpoints
- CORS configured for React frontend
- Sample data provided when database is empty

## Tech Stack
- **Frontend**: React 18, Vite, TailwindCSS, Recharts
- **Backend**: Django, SQLite
- **Charts**: Recharts library
- **Styling**: TailwindCSS with responsive design

## Development Notes
- The frontend proxies API calls to the Django backend
- Sample data is provided when the database is empty
- Both servers can run simultaneously on different ports
