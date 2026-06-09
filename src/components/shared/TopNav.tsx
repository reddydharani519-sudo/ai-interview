"use client";

import { motion } from "framer-motion";
import { Bell, Search, Settings, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/lib/utils";

export const TopNav = () => {
  const { user, logout } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 right-0 left-64 h-16 z-40
        bg-[#050505]/80 backdrop-blur-xl
        border-b border-white/5
        flex items-center justify-between px-6"
    >
      {/* Search */}
      <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2 w-72 border border-white/10">
        <Search className="w-4 h-4 text-white/40" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-white/70 text-sm outline-none w-full placeholder:text-white/30"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-10 h-10 rounded-xl bg-white/5
            border border-white/10 flex items-center justify-center
            hover:bg-white/10 transition-colors"
        >
          <Bell className="w-4 h-4 text-white/60" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-violet-500 rounded-full" />
        </motion.button>

        {/* Settings */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-xl bg-white/5
            border border-white/10 flex items-center justify-center
            hover:bg-white/10 transition-colors"
        >
          <Settings className="w-4 h-4 text-white/60" />
        </motion.button>

        {/* Divider */}
        <div className="w-px h-6 bg-white/10" />

        {/* User Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br
            from-violet-500 to-blue-600
            flex items-center justify-center
            text-white font-bold text-sm">
            {user?.displayName ? getInitials(user.displayName) : "U"}
          </div>
          <div className="hidden md:block">
            <p className="text-white text-sm font-medium leading-none">
              {user?.displayName || "User"}
            </p>
            <p className="text-white/40 text-xs mt-1">
              {user?.email || ""}
            </p>
          </div>
        </div>

        {/* Logout */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="w-10 h-10 rounded-xl bg-white/5
            border border-white/10 flex items-center justify-center
            hover:bg-red-500/20 hover:border-red-500/30
            transition-colors group"
        >
          <LogOut className="w-4 h-4 text-white/60 group-hover:text-red-400 transition-colors" />
        </motion.button>
      </div>
    </motion.header>
  );
};

export default TopNav;