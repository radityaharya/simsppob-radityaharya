import { redirect } from 'react-router-dom';
import { store } from '../store/reducers/store';
import { clearAuth } from '~/store/reducers/membership';

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

export async function logout() {
  store.dispatch(clearAuth());
  return redirect('/auth/login');
}
