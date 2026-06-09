"use client";

import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export const WelcomeBanner = () => {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl p-8"
      style={{
        background:
          "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2))",
        border: "1px solid rgba(139,92,246,0.3)",
      }}
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, rgba(139,92,246,0.15), transparent 60%)",
        }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-sm mb-1"
          >
            Welcome back 👋
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-black text-white mb-2"
          >
            {user?.displayName || "User"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/50 text-sm"
          >
            Ready to practice? Your next interview session awaits.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/subjects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3
                rounded-xl bg-gradient-to-r from-violet-600 to-blue-600
                text-white font-bold hover:shadow-lg
                hover:shadow-violet-500/30 transition-all"
            >
              <Zap className="w-4 h-4" />
              Start Interview
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeBanner;