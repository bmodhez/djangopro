import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const ExpensePieChart = ({ data }) => {
  // Mock data if no data provided
  const defaultData = [
    { name: 'Food', value: 400, color: '#FF6B6B' },
    { name: 'Transportation', value: 300, color: '#4ECDC4' },
    { name: 'Entertainment', value: 200, color: '#45B7D1' },
    { name: 'Utilities', value: 150, color: '#FFA07A' },
    { name: 'Shopping', value: 250, color: '#98D8C8' },
    { name: 'Healthcare', value: 100, color: '#F7DC6F' }
  ];

  const chartData = data || defaultData;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-gray-900 font-medium">{data.name}</p>
          <p className="text-gray-600">
            Amount: <span className="font-semibold">${data.value.toLocaleString()}</span>
          </p>
          <p className="text-gray-600">
            Percentage: <span className="font-semibold">{((data.value / chartData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null; // Don't show labels for slices smaller than 5%
    
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Expense Breakdown
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Distribution of expenses by category
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry) => (
                <span style={{ color: entry.color }} className="text-sm">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-gray-600">{item.name}: </span>
            <span className="font-medium ml-1">${item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensePieChart;
