import * as React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends Omit<React.ComponentProps<'input'>, 'className'> {
  className?: string;
  leftAddons?: React.ReactNode;
  rightAddons?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftAddons, rightAddons, ...props }, ref) => {
    return (
      <div className="relative">
        {leftAddons && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">{leftAddons}</div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            leftAddons && 'pl-10',
            rightAddons && 'pr-10',
            className
          )}
          ref={ref}
          {...props}
        />
        {rightAddons && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">{rightAddons}</div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input, type InputProps };
