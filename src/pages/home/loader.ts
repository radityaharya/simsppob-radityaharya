import { getProfile } from '~/store/actions/membership';
import { store } from '@/store/reducers/store';
import { requireAuth } from '@/utils/auth';
import { getServices, getBanners } from '~/store/actions/information';

export const homeLoader = async () => {
  await requireAuth();
  await store.dispatch(getProfile());
  await store.dispatch(getServices());
  await store.dispatch(getBanners());
  return null;
};
