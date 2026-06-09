"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export const CTABanner = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass p-16 rounded-3xl relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.15))",
            border: "1px solid rgba(139,92,246,0.2)",
          }}
        >
          {/* Background Glow */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.1), transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-6xl mb-6 inline-block"
            >
              🧠
            </motion.div>

            <h2 className="sub-heading text-white mb-4">
              Ready to Get{" "}
              <span className="gradient-text">Hired Faster?</span>
            </h2>

            <p className="body-text mb-8 max-w-xl mx-auto">
              Join 50,000+ developers who practice smarter and land
              offers at top tech companies.
            </p>

            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-5
                  rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600
                  text-white font-bold text-lg
                  hover:shadow-2xl hover:shadow-violet-500/30
                  transition-all duration-300"
              >
                <Zap className="w-5 h-5" />
                Start For Free Today
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>

            <p className="text-white/30 text-sm mt-4">
              No credit card required • Free forever plan available
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;