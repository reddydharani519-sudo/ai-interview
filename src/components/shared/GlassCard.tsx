"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  glowColor?: string;
  onClick?: () => void;
  delay?: number;
}

export const GlassCard = ({
  children,
  className,
  hover = false,
  glow = false,
  glowColor = "rgba(139, 92, 246, 0.3)",
  onClick,
  delay = 0,
}: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={
        hover
          ? { scale: 1.02, y: -8, transition: { duration: 0.3 } }
          : undefined
      }
      onClick={onClick}
      className={cn(
        "glass",
        hover && "glass-hover cursor-pointer",
        className
      )}
      style={{
        boxShadow: glow ? `0 0 60px ${glowColor}` : undefined,
      }}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;