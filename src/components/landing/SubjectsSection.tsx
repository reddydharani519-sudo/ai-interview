"use client";

import { motion } from "framer-motion";
import { SUBJECTS, DIFFICULTIES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const SubjectsSection = () => {
  return (
    <section id="subjects" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="sub-heading gradient-text-pink mb-4">
            Choose Your Subject
          </h2>
          <p className="body-text max-w-2xl mx-auto">
            Practice interviews across all major computer science subjects
            with AI-generated questions.
          </p>
        </motion.div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-12">
          {SUBJECTS.map((subject, i) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass p-5 rounded-2xl cursor-pointer group"
              style={{ border: `1px solid ${subject.color}20` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center
                  justify-center text-xl"
                  style={{
                    background: `${subject.color}15`,
                    border: `1px solid ${subject.color}30`,
                  }}
                >
                  {subject.icon}
                </div>
                <h3 className="text-white font-bold">{subject.name}</h3>
              </div>
              <p className="text-white/40 text-xs mb-3">
                {subject.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {subject.topics.slice(0, 2).map((topic) => (
                  <span
                    key={topic}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: `${subject.color}15`,
                      color: subject.color,
                      border: `1px solid ${subject.color}20`,
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Difficulty Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass p-8 rounded-3xl"
        >
          <h3 className="text-white font-bold text-xl mb-6 text-center">
            Select Difficulty
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {DIFFICULTIES.map((diff) => (
              <motion.div
                key={diff.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-2xl cursor-pointer text-center"
                style={{
                  background: `${diff.color}10`,
                  border: `1px solid ${diff.color}30`,
                }}
              >
                <p
                  className="font-bold text-lg mb-1"
                  style={{ color: diff.color }}
                >
                  {diff.name}
                </p>
                <p className="text-white/40 text-sm">{diff.description}</p>
                <p className="text-white/30 text-xs mt-1">
                  {diff.questions} Questions
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4
                  rounded-xl bg-gradient-to-r from-violet-600 to-blue-600
                  text-white font-bold hover:shadow-lg
                  hover:shadow-violet-500/30 transition-all"
              >
                Start Practicing Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SubjectsSection;