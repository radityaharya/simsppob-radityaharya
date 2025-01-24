import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import './styles/main.css';
import { useAppDispatch } from './store/reducers/store';
import { setLoading } from './store/reducers/auth';

const RootComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(false));
  }, [dispatch]);

  return <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />;
};

export default RootComponent;
