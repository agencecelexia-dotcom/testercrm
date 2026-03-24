import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50 focus:ring-offset-2 focus:ring-offset-[#081325]",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#2563eb]/20 text-[#2563eb]",
        secondary:
          "border-transparent bg-[#202a3d] text-[#c3c6d7]",
        outline:
          "border-[#434655]/30 text-[#d8e3fc]",
        destructive:
          "border-transparent bg-red-500/20 text-red-400",
        success:
          "border-transparent bg-emerald-500/20 text-emerald-400",
        warning:
          "border-transparent bg-yellow-500/20 text-yellow-400",
        info:
          "border-transparent bg-cyan-500/20 text-cyan-400",
        purple:
          "border-transparent bg-purple-500/20 text-purple-400",
        teal:
          "border-transparent bg-teal-500/20 text-teal-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
