import { redirect } from 'react-router-dom';
import { store } from '../store/reducers/store';

export async function requireAuth() {
  const state = store.getState();
  const token = state.auth.token;

  if (!token) {
    throw redirect('/auth/login');
  }

  return null;
}

export async function requireGuest() {
  const state = store.getState();

  if (state.auth.loading) {
    return null;
  }

  if (state.auth.isAuthenticated) {
    throw redirect('/');
  }

  return null;
}
