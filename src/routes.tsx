import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
import { requireAuth, requireGuest } from './utils/auth';
import Layout from './Layouts/Layout';
import AuthLayout from './Layouts/AuthLayout';
import ErrorPage from './pages/ErrorPage';

export const routes = createRoutesFromElements(
  <Route>
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      {/* <Route index element={<HomePage />} loader={requireAuth} /> */}
    </Route>

    <Route path="auth" element={<AuthLayout />} errorElement={<ErrorPage />}>
      <Route path="login" element={<LoginPage />} loader={requireGuest} />
      <Route path="register" element={<RegisterPage />} loader={requireGuest} />
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Route>
);

export const router = createBrowserRouter(routes);
