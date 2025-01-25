import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import { LoginPage, RegisterPage, authLoader } from './pages/auth';
import Layout from './Layouts/Layout';
import AuthLayout from './Layouts/AuthLayout';
import ErrorPage from './pages/ErrorPage';
import { HomePage, homeLoader } from './pages/home';
import { AccountPage, accountLoader } from './pages/account';
import { TopUpPage, topupLoader } from './pages/topup';
import { TransactionsPage, transactionsLoader } from './pages/transactions';
import { ServicesPage, servicesLoader } from './pages/services';

export const routes = createRoutesFromElements(
  <Route>
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} loader={homeLoader} />
    </Route>

    <Route path="auth" element={<AuthLayout />} loader={authLoader} errorElement={<ErrorPage />}>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
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
