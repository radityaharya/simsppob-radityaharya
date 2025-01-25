import { getProfile } from '~/store/actions/membership';
import { store } from '@/store/reducers/store';
import { requireAuth } from '@/utils/auth';
import { getBalance } from '~/store/actions/transaction';
import { getServices } from '~/store/actions/information';

export const servicesLoader = async () => {
  await requireAuth();
  await store.dispatch(getProfile());
  await store.dispatch(getBalance());
  await store.dispatch(getServices());
  return null;
};
