"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, Users, Star, Zap } from "lucide-react";
import { GradientButton } from "@/components/shared/GradientButton";
import { GlassCard } from "@/components/shared/GlassCard";

const floatingCards = [
  {
    id: 1,
    icon: "🎯",
    title: "Score: 94%",
    subtitle: "React Interview",
    color: "#8b5cf6",
    position: "top-20 -left-4 md:left-8",
  },
  {
    id: 2,
    icon: "🧠",
    title: "AI Feedback",
    subtitle: "Instant Analysis",
    color: "#06b6d4",
    position: "top-40 -right-4 md:right-8",
  },
  {
    id: 3,
    icon: "📈",
    title: "+45% Improved",
    subtitle: "This Week",
    color: "#10b981",
    position: "bottom-32 -left-4 md:left-16",
  },
  {
    id: 4,
    icon: "🏆",
    title: "Top 10%",
    subtitle: "Global Ranking",
    color: "#f59e0b",
    position: "bottom-20 -right-4 md:right-16",
  },
];

const stats = [
  { value: "50K+", label: "Users", icon: Users },
  { value: "4.9★", label: "Rating", icon: Star },
  { value: "92%", label: "Success", icon: Zap },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2
                rounded-full border border-violet-500/30
                bg-violet-500/10 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-violet-300 text-sm font-medium">
                  Powered by Claude AI & Whisper
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hero-heading mb-6"
            >
              <span className="text-white">Master</span>
              <br />
              <span className="gradient-text">Interviews</span>
              <br />
              <span className="text-white">With AI</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="body-text mb-8 max-w-lg"
            >
              Practice real interviews. Receive instant AI feedback.
              Track your progress. Get hired faster.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <Link href="/signup">
                <GradientButton size="lg">
                  <Zap className="w-5 h-5" />
                  Start Interview Free
                  <ArrowRight className="w-5 h-5" />
                </GradientButton>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-6 py-4
                  rounded-xl border border-white/10
                  bg-white/5 backdrop-blur-sm
                  text-white font-semibold
                  hover:bg-white/10 transition-all"
              >
                <div
                  className="w-8 h-8 rounded-full
                  bg-gradient-to-r from-violet-500 to-blue-500
                  flex items-center justify-center"
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
              className="flex items-center gap-8"
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-violet-400" />
                    <div>
                      <p className="text-white font-bold text-lg leading-none">
                        {stat.value}
                      </p>
                      <p className="text-white/40 text-xs">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right — AI Brain Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Central Brain */}
            <div className="relative w-80 h-80">
              {/* Rotating Rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-violet-500/20"
                  style={{ inset: `${i * 20}px` }}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{
                    duration: 10 + i * 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div
                    className="absolute top-0 left-1/2 w-3 h-3
                    rounded-full -translate-x-1/2 -translate-y-1/2"
                    style={{
                      background: `rgba(${
                        i === 0
                          ? "139,92,246"
                          : i === 1
                          ? "59,130,246"
                          : "6,182,212"
                      }, 0.8)`,
                      boxShadow: `0 0 10px rgba(${
                        i === 0
                          ? "139,92,246"
                          : i === 1
                          ? "59,130,246"
                          : "6,182,212"
                      }, 0.8)`,
                    }}
                  />
                </motion.div>
              ))}

              {/* Center Glow */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
                }}
              />

              {/* Brain Emoji */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    filter: [
                      "drop-shadow(0 0 20px rgba(139,92,246,0.5))",
                      "drop-shadow(0 0 40px rgba(139,92,246,0.8))",
                      "drop-shadow(0 0 20px rgba(139,92,246,0.5))",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-8xl"
                >
                  🧠
                </motion.div>
              </div>
            </div>

            {/* Floating Cards */}
            {floatingCards.map((card, i) => (
              <motion.div
                key={card.id}
                className={`absolute ${card.position}`}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              >
                <GlassCard className="p-3 flex items-center gap-3 min-w-max">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                    style={{
                      background: `${card.color}20`,
                      border: `1px solid ${card.color}30`,
                    }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold leading-none">
                      {card.title}
                    </p>
                    <p className="text-white/40 text-xs mt-0.5">
                      {card.subtitle}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;