import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all",
          variant === "default" && "bg-violet-600 text-white hover:bg-violet-700",
          variant === "outline" && "border border-white/10 text-white hover:bg-white/5",
          variant === "ghost" && "text-white/60 hover:text-white hover:bg-white/5",
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-8 px-3 text-sm",
          size === "lg" && "h-12 px-8",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }