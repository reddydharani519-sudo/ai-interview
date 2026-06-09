"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/constants";

export const StatsSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass p-6 rounded-2xl text-center glass-hover"
            >
              <p className="text-4xl font-black gradient-text mb-2">
                {stat.value}
              </p>
              <p className="text-white/50 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;