import React from 'react';
import { Link, useLocation, useMatch } from 'react-router-dom';
import { Logo } from './Logo';

const Header: React.FC = () => {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    const isActive = useMatch(path)?.pathname === location.pathname;
    return `inline-flex items-center px-1 pt-1 text-sm font-medium ${
      isActive ? 'text-red-600' : 'text-foreground hover:text-gray-800 hover:border-gray-300'
    }`;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-8">
            <Link to="/topup" className={getLinkClass('/topup')}>
              Topup
            </Link>
            <Link to="/transactions" className={getLinkClass('/transactions')}>
              Transaksi
            </Link>
            <Link to="/account" className={getLinkClass('/account')}>
              Akun
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
