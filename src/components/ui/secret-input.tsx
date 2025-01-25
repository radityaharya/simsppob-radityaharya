import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input, type InputProps } from './input';

const SecretInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [revealed, setRevealed] = React.useState(false);
    const togglePassword = () => {
      setRevealed(prev => !prev);
    };

    return (
      <div role="group" aria-label="Password input with visibility toggle">
        <Input
          type={revealed ? 'text' : 'password'}
          ref={ref}
          className={className}
          aria-describedby="password-toggle-help"
          rightAddons={
            <button
              type="button"
              onClick={togglePassword}
              className="group text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={revealed ? 'Hide password' : 'Show password'}
              aria-pressed={revealed}
            >
              {revealed ? (
                <EyeOff className="h-4 w-4 group-focus-within:text-primary" />
              ) : (
                <Eye className="h-4 w-4 group-focus-within:text-primary" />
              )}
            </button>
          }
          {...props}
        />
        <span id="password-toggle-help" className="sr-only">
          Use the show password button to toggle password visibility
        </span>
      </div>
    );
  }
);
SecretInput.displayName = 'SecretInput';

export { SecretInput };
