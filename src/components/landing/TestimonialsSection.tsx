"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
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
            Success Stories
          </h2>
          <p className="body-text max-w-2xl mx-auto">
            Join thousands of developers who landed their dream jobs
            using AI Interview Pro.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass p-6 rounded-2xl"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                {testimonial.content}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center
                  justify-center font-bold text-white text-sm"
                  style={{
                    background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}80)`,
                  }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-white/40 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;