import { redirect } from 'react-router-dom';
import { store } from '~/store/reducers/store';

export function authLoader() {
  const { isAuthenticated } = store.getState().membership;

  if (isAuthenticated) {
    throw redirect('/');
  }

  return null;
}
