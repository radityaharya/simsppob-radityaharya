import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
import { requireGuest } from './utils/auth';
import Layout from './Layouts/Layout';
import AuthLayout from './Layouts/AuthLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/home/HomePage';
import { homeLoader } from './pages/home/loader';
import AccountPage from './pages/account/AccountPage';
import { accountLoader } from './pages/account/loader';
import TopUpPage from './pages/topup/TopUp';
import { topupLoader } from './pages/topup/loader';
import TransactionsPage from './pages/transactions/TransactionsPage';
import { transactionsLoader } from './pages/transactions/loader';
import ServicesPage from './pages/services/ServicesPage';
import { servicesLoader } from './pages/services/loader';

export const routes = createRoutesFromElements(
  <Route>
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} loader={homeLoader} />
    </Route>

    <Route path="auth" element={<AuthLayout />} errorElement={<ErrorPage />}>
      <Route path="login" element={<LoginPage />} loader={requireGuest} />
      <Route path="register" element={<RegisterPage />} loader={requireGuest} />
    </Route>

    <Route path="account" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<AccountPage />} loader={accountLoader} />
    </Route>

    <Route path="topup" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<TopUpPage />} loader={topupLoader} />
    </Route>

    <Route path="transactions" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<TransactionsPage />} loader={transactionsLoader} />
    </Route>

    <Route path="services" element={<Layout />} errorElement={<ErrorPage />}>
      <Route path=":serviceCode" element={<ServicesPage />} loader={servicesLoader} />
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Route>
);

export const router = createBrowserRouter(routes);
