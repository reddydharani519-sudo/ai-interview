"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/lib/constants";

export const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
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
            Everything You Need
          </h2>
          <p className="body-text max-w-2xl mx-auto">
            A complete AI-powered interview preparation platform built
            for serious candidates.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass p-6 rounded-2xl cursor-pointer group"
              style={{
                border: `1px solid ${feature.color}20`,
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center
                justify-center text-2xl mb-4"
                style={{
                  background: `${feature.color}15`,
                  border: `1px solid ${feature.color}30`,
                  boxShadow: `0 0 20px ${feature.color}20`,
                }}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-white font-bold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom Glow Line */}
              <div
                className="mt-4 h-px w-0 group-hover:w-full
                transition-all duration-500 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${feature.color}, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;