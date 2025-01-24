import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import './styles/main.css';

const RootComponent: React.FC = () => {
  return <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />;
};

export default RootComponent;
