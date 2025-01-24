import { redirect } from 'react-router-dom';
import { store } from '../store/reducers/store';

export async function requireAuth() {
  const state = store.getState();
  const token = state.membership.token;

  if (!token) {
    throw redirect('/auth/login');
  }

  return null;
}

export async function requireGuest() {
  const state = store.getState();

  if (state.membership.loading) {
    return null;
  }

  if (state.membership.isAuthenticated) {
    throw redirect('/');
  }

  return null;
}
