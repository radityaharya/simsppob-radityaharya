import { AuthLogo } from './AuthLogo';
import { AuthIllustration } from './AuthIllustration';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="flex h-full min-h-screen">
      <div className="w-full sm:w-1/2 bg-background flex flex-col items-center justify-center p-8 gap-2">
        <AuthLogo />
        <div
          className="text-foreground mb-6 text-center text-2xl font-bold"
          role="heading"
          aria-level={1}
        >
          {title}
        </div>
        {children}
      </div>
      <AuthIllustration />
    </div>
  );
}
