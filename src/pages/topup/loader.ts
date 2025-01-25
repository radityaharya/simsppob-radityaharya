import { getProfile } from '~/store/actions/membership';
import { store } from '@/store/reducers/store';
import { requireAuth } from '@/utils/auth';
import { getBalance } from '~/store/actions/transaction';

export const topupLoader = async () => {
  await requireAuth();
  await store.dispatch(getProfile());
  await store.dispatch(getBalance());
  return null;
};
