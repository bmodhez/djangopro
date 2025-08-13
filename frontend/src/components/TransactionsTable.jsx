import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/transactions/');
      setTransactions(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch transactions');
      // Mock data for development
      setTransactions([
        {
          id: 1,
          description: 'Grocery Shopping',
          amount: -85.50,
          category: 'Food',
          date: '2024-01-15',
          type: 'expense'
        },
        {
          id: 2,
          description: 'Salary',
          amount: 3500.00,
          category: 'Income',
          date: '2024-01-01',
          type: 'income'
        },
        {
          id: 3,
          description: 'Gas Station',
          amount: -45.20,
          category: 'Transportation',
          date: '2024-01-12',
          type: 'expense'
        },
        {
          id: 4,
          description: 'Restaurant',
          amount: -28.75,
          category: 'Food',
          date: '2024-01-10',
          type: 'expense'
        },
        {
          id: 5,
          description: 'Freelance Work',
          amount: 750.00,
          category: 'Income',
          date: '2024-01-05',
          type: 'income'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount) => {
    const isNegative = amount < 0;
    const formattedAmount = Math.abs(amount).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    return isNegative ? `-${formattedAmount}` : formattedAmount;
  };

  const getAmountColor = (amount) => {
    return amount >= 0 ? 'text-green-600' : 'text-red-600';
  };

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Recent Transactions
        </h3>
        {error && (
          <p className="mt-1 text-sm text-red-600">
            {error} (showing sample data)
          </p>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {transaction.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getAmountColor(transaction.amount)}`}>
                  {formatAmount(transaction.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
