import { store } from '@/store/reducers/store';
import { requireAuth } from '@/utils/auth';
import { getProfile } from '@/store/actions/membership';

export const accountLoader = async () => {
  await requireAuth();
  await store.dispatch(getProfile());
  return null;
};
