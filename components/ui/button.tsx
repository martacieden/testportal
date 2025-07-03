import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-brand-primary text-white hover:bg-brand-primary/90",
        destructive: "bg-status-error text-white hover:bg-status-error/90",
        outline: "border border-neutral-200 bg-white hover:bg-neutral-50 hover:text-text-primary",
        secondary: "bg-neutral-100 text-text-primary hover:bg-neutral-200",
        ghost: "hover:bg-neutral-100 hover:text-text-primary",
        link: "text-brand-primary underline-offset-4 hover:underline",
        // Brand variants
        brand: "bg-brand-primary text-white hover:bg-brand-primary/90",
        brandOutline: "border border-brand-primary bg-white text-brand-primary hover:bg-brand-primary/10",
        // Status variants
        success: "bg-status-success text-white hover:bg-status-success/90",
        warning: "bg-status-warning text-white hover:bg-status-warning/90",
        error: "bg-status-error text-white hover:bg-status-error/90",
        info: "bg-status-info text-white hover:bg-status-info/90",
      },
      size: {
        xs: "h-7 px-2 text-xs [&_svg]:size-3",
        sm: "h-8 px-3 text-sm [&_svg]:size-4",
        md: "h-9 px-4 text-sm [&_svg]:size-4",
        lg: "h-10 px-6 text-base [&_svg]:size-5",
        xl: "h-11 px-8 text-lg [&_svg]:size-5",
        // Legacy sizes for backward compatibility
        default: "h-10 px-4 py-2 text-sm [&_svg]:size-4",
        icon: "h-10 w-10 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
