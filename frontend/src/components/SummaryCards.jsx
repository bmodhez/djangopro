import React from 'react';

const SummaryCards = ({ data }) => {
  const cards = [
    {
      title: 'Total Income',
      value: `$${data?.totalIncome?.toLocaleString() || '0'}`,
      icon: '💰',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      iconBg: 'bg-green-100'
    },
    {
      title: 'Total Expense',
      value: `$${data?.totalExpense?.toLocaleString() || '0'}`,
      icon: '💸',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      iconBg: 'bg-red-100'
    },
    {
      title: 'Savings',
      value: `$${data?.savings?.toLocaleString() || '0'}`,
      icon: '🏦',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      iconBg: 'bg-blue-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
      {cards.map((card, index) => (
        <div key={index} className={`${card.bgColor} overflow-hidden shadow rounded-lg`}>
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`${card.iconBg} rounded-md p-3`}>
                  <span className="text-2xl">{card.icon}</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {card.title}
                  </dt>
                  <dd>
                    <div className={`text-lg font-medium ${card.textColor}`}>
                      {card.value}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
