import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { AtSign, Lock, AlertCircle, X } from 'lucide-react';
import { MembershipSchemas } from '~/types/schemas/membership';
import { useAppDispatch, useAppSelector } from '@/store/reducers/store';
import { loginUser } from '@/store/actions/membership';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { SecretInput } from '@/components/ui/secret-input';
import { clearError } from '@/store/reducers/membership';
import React from 'react';
import { AuthLayout } from './components/AuthLayout';

type LoginFormData = z.infer<typeof MembershipSchemas.login.body>;

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector(state => state.membership);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(MembershipSchemas.login.body),
    defaultValues: {
      email: '',
      password: '',
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

  async function onSubmit(data: LoginFormData) {
    try {
      await dispatch(loginUser(data)).unwrap();
      navigate('/');
    } catch {
      console.error('Login failed');
    }
  }

  return (
    <AuthLayout
      title={
        <>
          Masuk atau buat akun
          <br />
          untuk memulai
        </>
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-2"
          aria-label="Form login"
        >
          <div className="space-y-2 pb-6" role="group" aria-label="Form fields">
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
                      disabled={loading}
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
              name="password"
              render={({ field, fieldState }) => (
                <FormItem className="h-[60px]">
                  <FormControl>
                    <SecretInput
                      aria-label="Password"
                      aria-invalid={!!fieldState.error}
                      aria-describedby={fieldState.error ? `password-error` : undefined}
                      placeholder="masukan password anda"
                      disabled={loading}
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
          </div>
          <Button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600"
            disabled={loading}
            aria-label={loading ? 'Logging in...' : 'Login'}
          >
            {loading ? 'Loading...' : 'Masuk'}
          </Button>

          <div className="text-center text-xs font-medium mt-4">
            <span className="text-muted-foreground">belum punya akun? registrasi </span>
            <Link
              to="/auth/register"
              className="text-red-500 font-medium"
              aria-label="Register page"
            >
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
