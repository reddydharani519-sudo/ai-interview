"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonHover } from "@/lib/animations";
import { Loader2 } from "lucide-react";

interface GradientButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

export const GradientButton = ({
  children,
  className,
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "md",
  type = "button",
  fullWidth = false,
}: GradientButtonProps) => {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:shadow-lg hover:shadow-violet-500/30",
    secondary:
      "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/30",
    outline:
      "border border-violet-500/50 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400",
    ghost:
      "text-white/70 hover:text-white hover:bg-white/5",
  };

  return (
    <motion.button
      variants={buttonHover}
      initial="rest"
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? "tap" : undefined}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "relative rounded-xl font-semibold transition-all duration-300",
        "flex items-center justify-center gap-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizes[size],
        variants[variant],
        fullWidth && "w-full",
        className
      )}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </motion.button>
  );
};

export default GradientButton;