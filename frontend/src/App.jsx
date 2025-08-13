import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TransactionsTable from './components/TransactionsTable';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Transactions</h1>
            <TransactionsTable />
          </div>
        );
      case 'analytics':
        return (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>
            <p className="text-gray-600">Analytics features coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;
