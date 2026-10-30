import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "secondary" | "ghost" | "destructive" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    // Basic tailwind v4 classes mirroring our tokens
    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"

    let variantStyles = ""
    switch (variant) {
      case "default":
        variantStyles = "bg-primary text-surface hover:bg-primary-hover shadow"
        break
      case "secondary":
        variantStyles = "bg-surface-muted text-text hover:bg-border shadow-sm"
        break
      case "ghost":
        variantStyles = "hover:bg-surface-muted hover:text-text"
        break
      case "destructive":
        variantStyles = "bg-danger text-surface hover:bg-danger/90 shadow-sm"
        break
      case "outline":
        variantStyles = "border border-border bg-transparent hover:bg-surface-muted hover:text-text shadow-sm"
        break
    }

    let sizeStyles = ""
    switch (size) {
      case "default":
        sizeStyles = "h-9 px-4 py-2"
        break
      case "sm":
        sizeStyles = "h-8 rounded-md px-3 text-xs"
        break
      case "lg":
        sizeStyles = "h-10 rounded-md px-8"
        break
      case "icon":
        sizeStyles = "h-9 w-9"
        break
    }

    return (
      <Comp
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
