import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import SummaryCards from './SummaryCards';
import TransactionsTable from './TransactionsTable';
import ExpensePieChart from './ExpensePieChart';
import MonthlyTrendChart from './MonthlyTrendChart';
import NetworkDebug from './NetworkDebug';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [useOfflineMode, setUseOfflineMode] = useState(false);

  useEffect(() => {
    if (useOfflineMode) {
      loadMockData();
    } else {
      fetchDashboardData();
    }
  }, [useOfflineMode]);

  const loadMockData = () => {
    setLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setDashboardData({
        totalIncome: 4250.00,
        totalExpense: 2159.45,
        savings: 2090.55,
        expenseBreakdown: [
          { name: 'Food', value: 400, color: '#FF6B6B' },
          { name: 'Transportation', value: 300, color: '#4ECDC4' },
          { name: 'Entertainment', value: 200, color: '#45B7D1' },
          { name: 'Utilities', value: 150, color: '#FFA07A' },
          { name: 'Shopping', value: 250, color: '#98D8C8' },
          { name: 'Healthcare', value: 100, color: '#F7DC6F' }
        ],
        monthlyTrend: [
          { month: 'Jan', income: 4000, expense: 2400 },
          { month: 'Feb', income: 3000, expense: 1398 },
          { month: 'Mar', income: 2000, expense: 2000 },
          { month: 'Apr', income: 2780, expense: 1908 },
          { month: 'May', income: 1890, expense: 2800 },
          { month: 'Jun', income: 2390, expense: 1800 },
          { month: 'Jul', income: 3490, expense: 2300 },
          { month: 'Aug', income: 4000, expense: 2100 },
          { month: 'Sep', income: 3200, expense: 2500 },
          { month: 'Oct', income: 2800, expense: 2200 },
          { month: 'Nov', income: 3600, expense: 2800 },
          { month: 'Dec', income: 4200, expense: 3000 }
        ]
      });
      setLoading(false);
    }, 500);
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/dashboard/');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      console.log('Using fallback sample data');
      // Use mock data if API fails
      setDashboardData({
        totalIncome: 4250.00,
        totalExpense: 2159.45,
        savings: 2090.55,
        expenseBreakdown: [
          { name: 'Food', value: 400, color: '#FF6B6B' },
          { name: 'Transportation', value: 300, color: '#4ECDC4' },
          { name: 'Entertainment', value: 200, color: '#45B7D1' },
          { name: 'Utilities', value: 150, color: '#FFA07A' },
          { name: 'Shopping', value: 250, color: '#98D8C8' }
        ],
        monthlyTrend: [
          { month: 'Jan', income: 4000, expense: 2400 },
          { month: 'Feb', income: 3000, expense: 1398 },
          { month: 'Mar', income: 2000, expense: 2000 },
          { month: 'Apr', income: 2780, expense: 1908 },
          { month: 'May', income: 1890, expense: 2800 },
          { month: 'Jun', income: 2390, expense: 1800 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-24 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-200 h-96 rounded-lg"></div>
            <div className="bg-gray-200 h-96 rounded-lg"></div>
          </div>
          <div className="bg-gray-200 h-64 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Network Debug Info */}
      <NetworkDebug />

      {/* Offline Mode Toggle */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-blue-900">Dashboard Mode</h3>
            <p className="text-xs text-blue-700">
              {useOfflineMode ? 'Using sample data (offline mode)' : 'Attempting to fetch live data'}
            </p>
          </div>
          <button
            onClick={() => setUseOfflineMode(!useOfflineMode)}
            className={`px-4 py-2 rounded text-sm font-medium ${
              useOfflineMode
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {useOfflineMode ? '🌐 Go Online' : '📱 Use Offline Mode'}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards data={dashboardData} />
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpensePieChart data={dashboardData?.expenseBreakdown} />
        <MonthlyTrendChart data={dashboardData?.monthlyTrend} />
      </div>
      
      {/* Transactions Table */}
      <TransactionsTable />
    </div>
  );
};

export default Dashboard;
