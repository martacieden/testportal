import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-brand-primary text-white hover:bg-brand-primary/80",
        secondary: "border-transparent bg-neutral-100 text-text-primary hover:bg-neutral-200",
        destructive: "border-transparent bg-status-error text-white hover:bg-status-error/80",
        outline: "border-neutral-200 text-text-primary",
        // Status variants
        success: "border-transparent bg-status-success/10 text-status-success border-status-success/20",
        warning: "border-transparent bg-status-warning/10 text-status-warning border-status-warning/20",
        error: "border-transparent bg-status-error/10 text-status-error border-status-error/20",
        info: "border-transparent bg-status-info/10 text-status-info border-status-info/20",
        // Brand variant
        brand: "border-transparent bg-brand-primary text-white hover:bg-brand-primary/80",
        // Size variants
        xs: "px-1.5 py-0.5 text-xs font-light",
        sm: "px-2 py-0.5 text-xs font-normal",
        md: "px-2.5 py-1 text-sm font-medium",
        lg: "px-3 py-1.5 text-sm font-semibold",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
