import { X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorBannerProps {
  error: string;
  onClose: () => void;
  className?: string;
}

export function ErrorBanner({ error, onClose, className = '' }: ErrorBannerProps) {
  return (
    <Card
      className={` bg-red-50 shadow-none border-none rounded-sm ${className}`}
      role="alert"
      aria-live="polite"
    >
      <CardContent className="p-3 flex items-center justify-between text-red-600">
        <div className="flex items-center space-x-2">
          <p className="text-sm">{error}</p>
        </div>
        <button
          onClick={onClose}
          className="text-red-600 hover:text-red-700"
          aria-label="Close error message"
        >
          <X className="h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  );
}
