"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import { GradientButton } from "@/components/shared/GradientButton";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
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
                  border-transparent border-t-violet-500 border-r-blue-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg">🧠</span>
              </div>
            </div>
            <div>
              <span className="text-white font-black text-lg leading-none">
                AI Interview
              </span>
              <span className="text-violet-400 font-black text-lg ml-1">
                Pro
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/60 hover:text-white
                  transition-colors duration-200 text-sm font-medium
                  relative group"
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px
                  bg-gradient-to-r from-violet-500 to-blue-500
                  group-hover:w-full transition-all duration-300"
                />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-white/60 hover:text-white
                transition-colors text-sm font-medium px-4 py-2"
            >
              Sign In
            </Link>
            <GradientButton size="sm" onClick={() => {}}>
              <Zap className="w-4 h-4" />
              Get Started Free
            </GradientButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-white/5
              border border-white/10 flex items-center justify-center"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40
              bg-[#050505]/95 backdrop-blur-xl
              border-b border-white/5 p-6"
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/70 hover:text-white
                    transition-colors text-lg font-medium py-2
                    border-b border-white/5"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-2">
                <Link
                  href="/login"
                  className="text-center py-3 rounded-xl
                    border border-white/10 text-white/70
                    hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <GradientButton fullWidth>
                  Get Started Free
                </GradientButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;