import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-[#434655]/30 bg-[#040e20] px-3 py-2 text-sm text-white placeholder:text-[#c3c6d7]/50 transition-colors duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb]/50 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
