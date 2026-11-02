import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--color-primary)] text-white shadow hover:bg-[var(--color-primary-hover)]",
        secondary:
          "border-transparent bg-[var(--color-surface-muted)] text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]/80",
        destructive:
          "border-transparent bg-[var(--color-danger)] text-white shadow hover:bg-[var(--color-danger)]/80",
        outline: "text-[var(--color-text)] border-[var(--color-border)]",
        success: "border-transparent bg-[var(--color-primary-soft)] text-[var(--color-primary-hover)] hover:bg-[var(--color-primary-soft)]/80"
      },
    },
    defaultVariants: {
      variant: "default",
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
