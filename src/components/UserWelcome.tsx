import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers/store';

function UserWelcomeSkeleton() {
  return (
    <div className="h-full bg-background px-0 sm:px-6 py-4 rounded-2xl flex sm:flex-col sm:justify-end gap-4">
      <div className="size-12 sm:size-16 rounded-full bg-gray-200 animate-pulse" />
      <div className="flex-1">
        <div className="h-4 sm:h-5 w-24 sm:w-32 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-6 sm:h-8 w-32 sm:w-48 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}

export function UserWelcome() {
  const { profile, persistedData, loading, isValidating } = useSelector(
    (state: RootState) => state.membership
  );

  if (loading && !persistedData) {
    return <UserWelcomeSkeleton />;
  }

  const name = profile
    ? `${profile.first_name} ${profile.last_name}`
    : persistedData
      ? `${persistedData.firstName} ${persistedData.lastName}`
      : 'User';

  const nameFallback = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const profileImage = profile?.profile_image || persistedData?.profileImage;

  return (
    <div className="h-full bg-background px-0 sm:px-6 py-4 rounded-2xl flex sm:flex-col sm:justify-end gap-4">
      <Avatar className={`size-12 sm:size-16 ${isValidating ? 'opacity-60' : ''}`}>
        <AvatarImage src={profileImage} alt={`Profile picture of ${name}`} />
        <AvatarFallback>{nameFallback}</AvatarFallback>
      </Avatar>
      <div className={isValidating ? 'opacity-60' : ''}>
        <p className="text-sm sm:text-lg font-medium text-muted-foreground">Selamat datang,</p>
        <h2 className="text-xl sm:text-3xl font-bold">{name}</h2>
      </div>
    </div>
  );
}
