import React from 'react';

const Sidebar = ({ sidebarOpen, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'transactions', name: 'Transactions', icon: '💳' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-white border-r border-gray-200 md:translate-x-0`}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
        <ul className="space-y-2 font-medium">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                  activeTab === item.id ? 'bg-blue-50 text-blue-700' : ''
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span className="ml-3">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
