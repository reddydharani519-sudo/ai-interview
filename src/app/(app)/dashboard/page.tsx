"use client";

import { motion } from "framer-motion";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { SubjectAnalysis } from "@/components/dashboard/SubjectAnalysis";
import { AIRecommendations } from "@/components/dashboard/AIRecommendations";
import { RecentSessions } from "@/components/dashboard/RecentSessions";
import { Achievements } from "@/components/dashboard/Achievements";

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      <WelcomeBanner />
      <StatsCards />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <SubjectAnalysis />
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentSessions />
        </div>
        <div className="space-y-6">
          <AIRecommendations />
          <Achievements />
        </div>
      </div>
    </motion.div>
  );
}