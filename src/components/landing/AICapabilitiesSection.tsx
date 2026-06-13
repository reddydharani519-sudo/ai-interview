"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Target, TrendingUp } from "lucide-react";

const capabilities = [
  {
    icon: Brain,
    title: "Smart Question Generation",
    description:
      "AI generates unique questions every session based on your subject and difficulty level.",
    color: "#10b981",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description:
      "Get detailed feedback on your answers within seconds using advanced AI models.",
    color: "#f59e0b",
  },
  {
    icon: Target,
    title: "Personalized Learning",
    description:
      "System adapts to your weak areas and focuses practice where you need it most.",
    color: "#ef4444",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Track improvement over time with detailed analytics and performance insights.",
    color: "#10b981",
  },
];

export const AICapabilitiesSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="sub-heading gradient-text mb-4">
            AI Capabilities
          </h2>
          <p className="body-text max-w-2xl mx-auto">
            Powered by the latest AI models to give you the most
            realistic interview experience possible.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass p-6 rounded-2xl flex gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center
                  justify-center flex-shrink-0"
                  style={{
                    background: `${cap.color}15`,
                    border: `1px solid ${cap.color}30`,
                  }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: cap.color }}
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AICapabilitiesSection;