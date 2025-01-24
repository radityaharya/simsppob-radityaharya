import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input, type InputProps } from './input';

const SecretInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [revealed, setRevealed] = React.useState(false);

    return (
      <Input
        type={revealed ? 'text' : 'password'}
        ref={ref}
        className={className}
        rightAddons={
          <button
            type="button"
            onClick={() => setRevealed(!revealed)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {revealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        {...props}
      />
    );
  }
);
SecretInput.displayName = 'SecretInput';

export { SecretInput };
