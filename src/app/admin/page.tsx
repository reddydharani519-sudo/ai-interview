"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  Activity,
  Search,
  Filter,
  MoreVertical,
  TrendingUp,
  Shield,
} from "lucide-react";

const mockUsers = [
  {
    id: "1",
    name: "Arjun Sharma",
    email: "arjun@example.com",
    interviews: 24,
    avgScore: 88,
    status: "active",
    joined: "Jan 2026",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya@example.com",
    interviews: 18,
    avgScore: 92,
    status: "active",
    joined: "Feb 2026",
  },
  {
    id: "3",
    name: "Rahul Verma",
    email: "rahul@example.com",
    interviews: 31,
    avgScore: 76,
    status: "inactive",
    joined: "Dec 2025",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    email: "sneha@example.com",
    interviews: 12,
    avgScore: 84,
    status: "active",
    joined: "Mar 2026",
  },
];

const adminStats = [
  {
    label: "Total Users",
    value: "50,234",
    icon: Users,
    color: "#8b5cf6",
    change: "+12%",
  },
  {
    label: "Total Sessions",
    value: "124,891",
    icon: Activity,
    color: "#06b6d4",
    change: "+8%",
  },
  {
    label: "Questions",
    value: "2,847",
    icon: BookOpen,
    color: "#10b981",
    change: "+5%",
  },
  {
    label: "Avg Score",
    value: "78%",
    icon: TrendingUp,
    color: "#f59e0b",
    change: "+3%",
  },
];

export default function AdminPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("users");

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl bg-violet-500/20
          flex items-center justify-center"
        >
          <Shield className="w-5 h-5 text-violet-400" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">Admin Panel</h1>
          <p className="text-white/40 text-sm">
            Manage users, questions and sessions
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-5 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${stat.color}15` }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: stat.color }}
                  />
                </div>
                <span className="text-green-400 text-xs font-bold">
                  {stat.change}
                </span>
              </div>
              <p
                className="text-2xl font-black"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
              <p className="text-white/40 text-xs mt-1">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {["users", "questions", "sessions"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2 rounded-xl text-sm font-medium
              capitalize transition-all"
            style={{
              background:
                activeTab === tab
                  ? "rgba(139,92,246,0.2)"
                  : "rgba(255,255,255,0.05)",
              border: `1px solid ${
                activeTab === tab
                  ? "rgba(139,92,246,0.3)"
                  : "rgba(255,255,255,0.08)"
              }`,
              color:
                activeTab === tab
                  ? "#8b5cf6"
                  : "rgba(255,255,255,0.5)",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* User Management */}
      {activeTab === "users" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl overflow-hidden"
        >
          {/* Table Header */}
          <div className="p-4 border-b border-white/5 flex items-center gap-4">
            <div
              className="flex items-center gap-2 flex-1
              bg-white/5 rounded-xl px-3 py-2
              border border-white/10"
            >
              <Search className="w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-white text-sm
                  outline-none flex-1 placeholder:text-white/20"
              />
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2
              rounded-xl bg-white/5 border border-white/10
              text-white/50 text-sm hover:bg-white/10 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {[
                    "User",
                    "Interviews",
                    "Avg Score",
                    "Status",
                    "Joined",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-white/30 text-xs
                        font-medium px-4 py-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-white/5
                      hover:bg-white/3 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-xl
                          bg-gradient-to-br from-violet-500 to-blue-600
                          flex items-center justify-center
                          text-white text-xs font-bold"
                        >
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">
                            {user.name}
                          </p>
                          <p className="text-white/30 text-xs">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/60 text-sm">
                      {user.interviews}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-sm font-bold"
                        style={{
                          color:
                            user.avgScore >= 80
                              ? "#10b981"
                              : user.avgScore >= 60
                              ? "#3b82f6"
                              : "#f59e0b",
                        }}
                      >
                        {user.avgScore}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          background:
                            user.status === "active"
                              ? "rgba(16,185,129,0.15)"
                              : "rgba(239,68,68,0.15)",
                          color:
                            user.status === "active"
                              ? "#10b981"
                              : "#ef4444",
                          border: `1px solid ${
                            user.status === "active"
                              ? "rgba(16,185,129,0.3)"
                              : "rgba(239,68,68,0.3)"
                          }`,
                        }}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/30 text-xs">
                      {user.joined}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        className="p-1.5 rounded-lg hover:bg-white/10
                        transition-colors text-white/30
                        hover:text-white"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Questions Tab */}
      {activeTab === "questions" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass p-6 rounded-2xl text-center"
        >
          <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-3" />
          <p className="text-white/40">
            Question management coming soon
          </p>
        </motion.div>
      )}

      {/* Sessions Tab */}
      {activeTab === "sessions" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass p-6 rounded-2xl text-center"
        >
          <Activity className="w-12 h-12 text-white/20 mx-auto mb-3" />
          <p className="text-white/40">
            Session monitoring coming soon
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}