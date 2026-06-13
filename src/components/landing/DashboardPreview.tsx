"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const DashboardPreview = () => {
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
          <h2 className="sub-heading text-white mb-4">
            Your Personal{" "}
            <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="body-text max-w-2xl mx-auto">
            Track every interview, monitor your progress, and get
            AI-powered recommendations to improve faster.
          </p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Glow */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.1), transparent 70%)",
              filter: "blur(40px)",
              transform: "translateY(-20px)",
            }}
          />

          {/* Preview Card */}
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

            {/* Content */}
            <div className="p-6 grid grid-cols-4 gap-4">
              {[
                { label: "Interviews", value: "24", color: "#10b981" },
                { label: "Avg Score", value: "87%", color: "#f59e0b" },
                { label: "Hours", value: "12h", color: "#ef4444" },
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

              {/* Chart */}
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
                          "linear-gradient(180deg, #10b981, #059669)",
                        opacity: 0.7,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Side */}
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
                <p className="text-sm font-bold text-green-400">
                  React
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Score: 92%
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-8"
          >
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4
                  rounded-xl text-white font-semibold transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, #10b981, #059669)",
                  boxShadow: "0 8px 30px rgba(16,185,129,0.25)",
                }}
              >
                Get Your Dashboard
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;