import { store } from '../store/reducers/store';
import { clearAuth } from '~/store/reducers/membership';
import { getProfile } from '~/store/actions/membership';

export async function requireAuth() {
  const { loading, isAuthenticated, token } = store.getState().membership;

  if (loading) return null;
  if (!isAuthenticated || !token) {
    store.dispatch(clearAuth());
    window.location.href = '/auth/login';
    return null;
  }

  try {
    await store.dispatch(getProfile()).unwrap();
    return null;
  } catch {
    store.dispatch(clearAuth());
    window.location.href = '/auth/login';
    return null;
  }
}

export async function requireGuest() {
  const { loading, isAuthenticated } = store.getState().membership;
  if (loading) return null;
  if (isAuthenticated) {
    window.location.href = '/';
    return null;
  }
  return null;
}

export const logout = () => {
  store.dispatch(clearAuth());
  window.location.href = '/auth/login';
  return null;
};
