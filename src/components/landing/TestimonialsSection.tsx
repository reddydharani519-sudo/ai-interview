"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";

export const TestimonialsSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-8
            flex items-center justify-center"
            style={{
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            <Users className="w-8 h-8 text-indigo-400" />
          </div>

          <h2 className="sub-heading text-white mb-6">
            Be Among the First
            <br />
            <span className="gradient-text">Professionals</span> to Try It
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            AI Interview Pro is currently in early access.
            Join thousands of developers, engineers, and
            professionals who are already preparing smarter
            and landing better roles.
          </p>

          {/* Early Access Stats */}
          <div
            className="grid grid-cols-3 gap-6 mb-10 p-6 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {[
              { value: "2,400+", label: "Early Access Users" },
              { value: "18,000+", label: "Practice Sessions" },
              { value: "94%", label: "Would Recommend" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold gradient-text mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4
                rounded-xl text-white font-semibold transition-all"
              style={{
                background:
                  "linear-gradient(135deg, #6366f1, #3b82f6)",
                boxShadow: "0 8px 30px rgba(99,102,241,0.25)",
              }}
            >
              Join Early Access
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;