import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-violet-500/20 text-violet-400",
        variant === "success" && "bg-green-500/20 text-green-400",
        variant === "warning" && "bg-yellow-500/20 text-yellow-400",
        variant === "danger" && "bg-red-500/20 text-red-400",
        className
      )}
      {...props}
    />
  )
}

export { Badge }