"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Mic,
  User,
  Trophy,
  Settings,
  ChevronRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "#8b5cf6",
  },
  {
    label: "Subjects",
    href: "/subjects",
    icon: BookOpen,
    color: "#3b82f6",
  },
  {
    label: "Interview",
    href: "/interview",
    icon: Mic,
    color: "#06b6d4",
  },
  {
    label: "Achievements",
    href: "/achievements",
    icon: Trophy,
    color: "#f59e0b",
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
    color: "#10b981",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    color: "#ec4899",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-full w-64 z-50
        bg-[#050505]/90 backdrop-blur-xl
        border-r border-white/5
        flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-xl border-2
                border-transparent border-t-violet-500
                border-r-blue-500"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg">🧠</span>
            </div>
          </div>
          <div>
            <h1 className="text-white font-black text-sm leading-none">
              AI Interview
            </h1>
            <p className="text-violet-400 font-bold text-xs mt-0.5">
              PRO
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto no-scrollbar">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl",
                  "transition-all duration-200 group relative",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}20, transparent)`,
                      border: `1px solid ${item.color}30`,
                    }}
                  />
                )}

                {/* Icon */}
                <div
                  className={cn(
                    "relative w-8 h-8 rounded-lg flex items-center justify-center",
                    "transition-all duration-200",
                    isActive ? "bg-white/10" : "group-hover:bg-white/5"
                  )}
                  style={{
                    boxShadow: isActive
                      ? `0 0 20px ${item.color}40`
                      : undefined,
                  }}
                >
                  <Icon
                    className="w-4 h-4 relative z-10"
                    style={{ color: isActive ? item.color : undefined }}
                  />
                </div>

                {/* Label */}
                <span className="relative z-10 text-sm font-medium">
                  {item.label}
                </span>

                {/* Arrow */}
                {isActive && (
                  <ChevronRight
                    className="w-3 h-3 ml-auto relative z-10"
                    style={{ color: item.color }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Upgrade Banner */}
      <div className="p-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass p-4 rounded-2xl cursor-pointer"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.15))",
            border: "1px solid rgba(139,92,246,0.2)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-white text-sm font-bold">
              Upgrade to Pro
            </span>
          </div>
          <p className="text-white/50 text-xs">
            Unlock unlimited interviews and advanced analytics
          </p>
        </motion.div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl bg-gradient-to-br
            from-violet-500 to-blue-600
            flex items-center justify-center
            text-white font-bold text-sm flex-shrink-0"
          >
            {user?.displayName ? getInitials(user.displayName) : "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">
              {user?.displayName || "User"}
            </p>
            <p className="text-white/40 text-xs truncate">
              {user?.email || ""}
            </p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;