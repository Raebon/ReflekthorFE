import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, errorMessage, ...props }, ref) => {
    return (
      <>
        <input
          className={cn(
            "flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 required:focus:ring-red-400 required:dark:focus:ring-red-400 valid:focus:ring-slate-400 valid:dark:focus:ring-slate-400",
            className
          )}
          ref={ref}
          {...props}
        />
        {errorMessage && (
          <small className="text-red-600 px-1">* {errorMessage}</small>
        )}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
