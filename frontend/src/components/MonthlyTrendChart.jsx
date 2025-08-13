import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MonthlyTrendChart = ({ data }) => {
  // Mock data if no data provided
  const defaultData = [
    { month: 'Jan', income: 4000, expense: 2400, savings: 1600 },
    { month: 'Feb', income: 3000, expense: 1398, savings: 1602 },
    { month: 'Mar', income: 2000, expense: 2000, savings: 0 },
    { month: 'Apr', income: 2780, expense: 1908, savings: 872 },
    { month: 'May', income: 1890, expense: 2800, savings: -910 },
    { month: 'Jun', income: 2390, expense: 1800, savings: 590 },
    { month: 'Jul', income: 3490, expense: 2300, savings: 1190 },
    { month: 'Aug', income: 4000, expense: 2100, savings: 1900 },
    { month: 'Sep', income: 3200, expense: 2500, savings: 700 },
    { month: 'Oct', income: 2800, expense: 2200, savings: 600 },
    { month: 'Nov', income: 3600, expense: 2800, savings: 800 },
    { month: 'Dec', income: 4200, expense: 3000, savings: 1200 }
  ];

  const chartData = data || defaultData;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-gray-900 font-medium mb-2">{`${label} 2024`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-semibold">${entry.value.toLocaleString()}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    return `$${value}`;
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Monthly Income vs Expenses
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Compare your monthly income and expenses over time
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="rect"
            />
            <Bar 
              dataKey="income" 
              fill="#10B981" 
              name="Income"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="expense" 
              fill="#EF4444" 
              name="Expenses"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm text-gray-600">Avg Income</p>
              <p className="text-lg font-semibold text-green-600">
                ${(chartData.reduce((sum, item) => sum + item.income, 0) / chartData.length).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm text-gray-600">Avg Expenses</p>
              <p className="text-lg font-semibold text-red-600">
                ${(chartData.reduce((sum, item) => sum + item.expense, 0) / chartData.length).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm text-gray-600">Net Savings</p>
              <p className="text-lg font-semibold text-blue-600">
                ${chartData.reduce((sum, item) => sum + (item.income - item.expense), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyTrendChart;
