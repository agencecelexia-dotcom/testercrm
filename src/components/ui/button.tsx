"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#081325] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#2563eb] to-[#03b5d3] text-white shadow-lg shadow-[#2563eb]/25 hover:shadow-[#2563eb]/40 hover:brightness-110",
        secondary:
          "bg-[#202a3d] text-[#d8e3fc] border border-[#434655]/15 hover:bg-[#202a3d]/80 hover:text-white",
        outline:
          "border border-[#434655]/30 bg-transparent text-[#d8e3fc] hover:bg-[#202a3d] hover:text-white",
        ghost:
          "text-[#c3c6d7] hover:bg-[#202a3d] hover:text-white",
        destructive:
          "bg-red-600/90 text-white hover:bg-red-600 shadow-lg shadow-red-600/25",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        default: "h-10 px-4 py-2",
        lg: "h-12 px-6 text-base rounded-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
