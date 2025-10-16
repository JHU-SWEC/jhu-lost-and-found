import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-1 text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-gray-200 text-gray-900",
        outline: "border border-gray-300 text-gray-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={badgeVariants({ variant, className })} {...props} />
  )
);

Badge.displayName = "Badge";
