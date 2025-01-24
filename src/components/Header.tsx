import React from 'react';
import { Link, useLocation, useMatch } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    const isActive = useMatch(path)?.pathname === location.pathname;
    return `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
      isActive
        ? 'border-blue-500 text-blue-600'
        : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
    }`;
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-800">My App</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className={getLinkClass('/')}>
                Home
              </Link>
              <Link to="/about" className={getLinkClass('/about')}>
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
