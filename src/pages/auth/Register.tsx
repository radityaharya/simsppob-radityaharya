import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { AtSign, User, Lock, AlertCircle, X } from 'lucide-react';
import { AuthSchemas } from '~/types/schemas/membership';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SecretInput } from '@/components/ui/secret-input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { AuthLayout } from './components/AuthLayout';
import { useAppDispatch, useAppSelector } from '@/store/reducers/store';
import { registerUser } from '@/store/actions/thunkActions';
import { Card, CardContent } from '@/components/ui/card';
import { clearError } from '@/store/reducers/auth';
import React from 'react';

type RegisterFormData = z.infer<typeof AuthSchemas.registration.body> & {
  confirm_password: string;
};

const registerSchema = AuthSchemas.registration.body
  .extend({
    confirm_password: z.string().min(8),
  })
  .refine(data => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector(state => state.auth);
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      confirm_password: '',
    },
  });

  React.useEffect(() => {
    const subscription = form.watch(() => {
      if (error) {
        dispatch(clearError());
      }
    });
    return () => subscription.unsubscribe();
  }, [dispatch, error, form]);

  React.useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  async function onSubmit(data: RegisterFormData) {
    try {
      const { confirm_password, ...registrationData } = data;
      const result = await dispatch(registerUser(registrationData)).unwrap();
      navigate('/auth/login');
    } catch (err) {
      // Error is handled by redux
    }
  }

  return (
    <AuthLayout
      title={
        <>
          Lengkapi data untuk
          <br />
          membuat akun
        </>
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-2"
          aria-label="Form pendaftaran"
        >
          <div className="space-y-2 pb-8" role="group" aria-label="Form fields">
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem className="h-[60px]">
                  <FormControl>
                    <Input
                      aria-label="Email address"
                      aria-invalid={!!fieldState.error}
                      aria-describedby={fieldState.error ? `email-error` : undefined}
                      placeholder="masukan email anda"
                      leftAddons={
                        <AtSign
                          className={`h-4 w-4 ${
                            fieldState.error ? 'text-red-500' : 'text-gray-500'
                          }`}
                        />
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-right" id="email-error" role="alert" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="first_name"
              render={({ field, fieldState }) => (
                <FormItem className="h-[60px]">
                  <FormControl>
                    <Input
                      aria-label="Nama depan"
                      aria-invalid={!!fieldState.error}
                      aria-describedby={fieldState.error ? `first-name-error` : undefined}
                      placeholder="nama depan"
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
                  <FormMessage className="text-right" id="first-name-error" role="alert" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field, fieldState }) => (
                <FormItem className="h-[60px]">
                  <FormControl>
                    <Input
                      aria-label="Nama belakang"
                      aria-invalid={!!fieldState.error}
                      aria-describedby={fieldState.error ? `last-name-error` : undefined}
                      placeholder="nama belakang"
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
                  <FormMessage className="text-right" id="last-name-error" role="alert" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem className="h-[60px]">
                  <FormControl>
                    <SecretInput
                      aria-label="Password"
                      aria-invalid={!!fieldState.error}
                      aria-describedby={fieldState.error ? `password-error` : undefined}
                      placeholder="buat password"
                      leftAddons={
                        <Lock
                          className={`h-4 w-4 ${
                            fieldState.error ? 'text-red-500' : 'text-gray-500'
                          }`}
                        />
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-right" id="password-error" role="alert" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field, fieldState }) => (
                <FormItem className="h-[60px]">
                  <FormControl>
                    <SecretInput
                      aria-label="Konfirmasi password"
                      aria-invalid={!!fieldState.error}
                      aria-describedby={fieldState.error ? `confirm-password-error` : undefined}
                      placeholder="konfirmasi password"
                      leftAddons={
                        <Lock
                          className={`h-4 w-4 ${
                            fieldState.error ? 'text-red-500' : 'text-gray-500'
                          }`}
                        />
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-right" id="confirm-password-error" role="alert" />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600"
            disabled={loading}
            aria-label={loading ? 'Registering...' : 'Register'}
          >
            {loading ? 'Loading...' : 'Registrasi'}
          </Button>

          <div className="text-center text-xs font-medium mt-4" role="contentinfo">
            <span className="text-muted-foreground">sudah punya akun? login </span>
            <Link to="/auth/login" className="text-red-500 font-medium" aria-label="Login page">
              di sini
            </Link>
          </div>
        </form>
      </Form>
      {error && (
        <Card
          className="border-red-200 bg-red-50 w-[90%] absolute bottom-4 left-1/2 -translate-x-1/2"
          role="alert"
          aria-live="polite"
        >
          <CardContent className="p-4 flex items-center justify-between text-red-600">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{error}</p>
            </div>
            <button
              onClick={() => dispatch(clearError())}
              className="text-red-600 hover:text-red-700"
              aria-label="Close error message"
            >
              <X className="h-4 w-4" />
            </button>
          </CardContent>
        </Card>
      )}
    </AuthLayout>
  );
}
