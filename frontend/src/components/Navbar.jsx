import React from 'react';

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={toggleSidebar}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <a href="#" className="text-xl font-semibold md:mr-24">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-900">
                Dashboard
              </span>
            </a>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ml-3">
              <div className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-sm font-medium">U</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
