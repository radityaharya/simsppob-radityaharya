import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="h-[100dvh]">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
