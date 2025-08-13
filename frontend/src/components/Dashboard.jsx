import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import SummaryCards from './SummaryCards';
import TransactionsTable from './TransactionsTable';
import ExpensePieChart from './ExpensePieChart';
import MonthlyTrendChart from './MonthlyTrendChart';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/dashboard/');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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
