import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout';

export const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />} errorElement={<NotFoundPage />}>
    <Route index element={<HomePage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>
);

export const router = createBrowserRouter(routes);
