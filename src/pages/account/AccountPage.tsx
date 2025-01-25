import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Pencil, AtSign } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAppDispatch, useAppSelector } from '@/store/reducers/store';
import { updateProfile, updateProfileImage } from '@/store/actions/membership';
import { MembershipSchemas } from '~/types/schemas/membership';
import { z } from 'zod';
import { cn } from '~/lib/utils';
import { useToast } from '~/hooks/use-toast';
import { logout } from '~/utils/auth';
import { useNavigate } from 'react-router-dom';

type ProfileFormData = z.infer<typeof MembershipSchemas.updateProfile.body>;

export default function AccountPage() {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector(state => state.membership);
  const { toast } = useToast();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(MembershipSchemas.updateProfile.body),
    defaultValues: {
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        first_name: profile.first_name,
        last_name: profile.last_name,
      });
    }
  }, [profile, form]);

  const name =
    profile?.first_name && profile?.last_name
      ? `${profile.first_name} ${profile.last_name}`
      : 'User';

  const nameFallback = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  async function onSubmit(data: ProfileFormData) {
    try {
      await dispatch(updateProfile(data)).unwrap();
      setIsEdit(false);
      toast({
        title: 'Profile updated',
      });
    } catch (err) {
      toast({
        title: 'Failed to update profile',
        description: err instanceof Error ? err.message : 'An error occurred',
        variant: 'destructive',
      });
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await dispatch(updateProfileImage(file)).unwrap();
        toast({
          title: 'Profile picture updated',
        });
      } catch (err) {
        toast({
          title: 'Failed to update profile picture',
          description: err instanceof Error ? err.message : 'An error occurred',
          variant: 'destructive',
        });
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  if (loading) {
    return null;
  }

  return (
    <div className="max-w-screen overflow-x-hidden">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <section className="mb-8" aria-label="User Profile">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="size-24 sm:size-32">
                <AvatarImage src={profile?.profile_image} alt={`Profile picture of ${name}`} />
                <AvatarFallback>{nameFallback}</AvatarFallback>
              </Avatar>
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 p-2 bg-gray-200 border border-gray-300 rounded-full cursor-pointer"
                aria-label="Update profile picture"
              >
                <Pencil className="size-4 text-black" />
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <h1 className="text-2xl font-bold">{name}</h1>
          </div>
        </section>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-4">
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                value={profile?.email || ''}
                disabled
                placeholder="Email"
                aria-label="Email"
                className="bg-gray-100 focus-visible:ring-0 focus-visible:ring-offset-0"
                leftAddons={<AtSign className="h-4 w-4 text-gray-500" />}
              />
            </div>

            <FormField
              control={form.control}
              name="first_name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel htmlFor="first_name">Nama Depan</FormLabel>
                  <FormControl>
                    <Input
                      id="first_name"
                      placeholder="Nama Depan"
                      aria-label="First Name"
                      readOnly={!isEdit}
                      className={cn(
                        !isEdit && 'bg-gray-100 focus-visible:ring-0 focus-visible:ring-offset-0'
                      )}
                      leftAddons={
                        <User
                          className={`h-4 w-4 ${
                            fieldState.error ? 'text-red-500' : 'text-gray-500'
                          }`}
                        />
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel htmlFor="last_name">Nama Belakang</FormLabel>
                  <FormControl>
                    <Input
                      id="last_name"
                      placeholder="Nama Belakang"
                      aria-label="Last Name"
                      readOnly={!isEdit}
                      className={cn(
                        !isEdit && 'bg-gray-100 focus-visible:ring-0 focus-visible:ring-offset-0'
                      )}
                      leftAddons={
                        <User
                          className={`h-4 w-4 ${
                            fieldState.error ? 'text-red-500' : 'text-gray-500'
                          }`}
                        />
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isEdit ? (
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsEdit(false)}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600"
                  disabled={loading}
                >
                  {loading ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                className="w-full outline outline-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                onClick={() => setIsEdit(true)}
                variant="outline"
              >
                Edit Profile
              </Button>
            )}
          </form>
        </Form>

        <Button type="button" variant="destructive" className="w-full mt-4" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
