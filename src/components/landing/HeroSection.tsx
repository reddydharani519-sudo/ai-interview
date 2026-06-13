"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  CheckCircle,
  Users,
  Star,
  Zap,
  TrendingUp,
} from "lucide-react";

const trustPoints = [
  "No credit card required",
  "Free to get started",
  "AI-powered feedback",
];

const stats = [
  { value: "50K+", label: "Professionals", icon: Users },
  { value: "4.9★", label: "Rating", icon: Star },
  { value: "92%", label: "Success Rate", icon: TrendingUp },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2
              rounded-full text-sm font-medium"
              style={{
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.2)",
                color: "#a5b4fc",
              }}
            >
              <Zap className="w-3.5 h-3.5" />
              AI-Powered Interview Preparation Platform
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-heading mb-6"
          >
            <span className="text-white">Land Your</span>
            <br />
            <span className="gradient-text">Dream Job</span>
            <br />
            <span className="text-white">Faster</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-400 mb-8 max-w-2xl
            mx-auto leading-relaxed"
          >
            Practice with AI interviewers that think like real
            hiring managers. Get instant feedback, track your
            progress, and walk into every interview with confidence.
          </motion.p>

          {/* Trust Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center
            gap-4 mb-10"
          >
            {trustPoints.map((point) => (
              <div
                key={point}
                className="flex items-center gap-2 text-sm text-gray-400"
              >
                <CheckCircle className="w-4 h-4 text-indigo-400" />
                {point}
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center
            justify-center gap-4 mb-16"
          >
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-8 py-4
                  rounded-xl font-semibold text-white
                  transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #6366f1, #3b82f6)",
                  boxShadow:
                    "0 8px 30px rgba(99,102,241,0.3)",
                }}
              >
                Start Practicing Free
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-8 py-4
                rounded-xl font-semibold transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#e5e7eb",
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center
                justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #6366f1, #3b82f6)",
                }}
              >
                <Play className="w-3 h-3 text-white ml-0.5" />
              </div>
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center gap-12"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          {/* Glow behind preview */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15), transparent 70%)",
              filter: "blur(40px)",
              transform: "translateY(-20px)",
            }}
          />

          {/* Mock Dashboard Preview */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
            }}
          >
            {/* Browser Bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex gap-1.5">
                {["#ef4444", "#f59e0b", "#10b981"].map((c) => (
                  <div
                    key={c}
                    className="w-3 h-3 rounded-full"
                    style={{ background: c, opacity: 0.7 }}
                  />
                ))}
              </div>
              <div
                className="flex-1 mx-4 h-6 rounded-lg"
                style={{ background: "rgba(255,255,255,0.05)" }}
              />
            </div>

            {/* Dashboard Content Preview */}
            <div className="p-6 grid grid-cols-4 gap-4">
              {/* Stat Cards */}
              {[
                { label: "Interviews", value: "24", color: "#6366f1" },
                { label: "Avg Score", value: "87%", color: "#3b82f6" },
                { label: "Hours", value: "12h", color: "#06b6d4" },
                { label: "Streak", value: "7d", color: "#10b981" },
              ].map((card) => (
                <div
                  key={card.label}
                  className="p-4 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <p
                    className="text-xl font-bold"
                    style={{ color: card.color }}
                  >
                    {card.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {card.label}
                  </p>
                </div>
              ))}

              {/* Chart Placeholder */}
              <div
                className="col-span-3 rounded-xl p-4 h-32"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <p className="text-xs text-gray-600 mb-3">
                  Performance Trend
                </p>
                <div className="flex items-end gap-1 h-16">
                  {[40, 55, 48, 70, 65, 80, 87].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        background:
                          "linear-gradient(180deg, #6366f1, #3b82f6)",
                        opacity: 0.6,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Side Panel */}
              <div
                className="rounded-xl p-4 h-32"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <p className="text-xs text-gray-600 mb-2">
                  Top Subject
                </p>
                <p className="text-sm font-bold text-indigo-400">
                  React
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Score: 92%
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;