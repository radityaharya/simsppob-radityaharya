import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-4 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
