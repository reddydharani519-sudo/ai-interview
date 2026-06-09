"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Bell,
  Trash2,
  Save,
  Camera,
  Shield,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/lib/utils";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [displayName, setDisplayName] = useState(
    user?.displayName || ""
  );
  const [bio, setBio] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Bell },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white mb-1">
          Profile Settings
        </h1>
        <p className="text-white/40">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ x: 4 }}
                onClick={() => setActiveTab(tab.id)}
                className="w-full flex items-center gap-3 px-4 py-3
                  rounded-xl transition-all text-left"
                style={{
                  background:
                    activeTab === tab.id
                      ? "rgba(139,92,246,0.15)"
                      : "rgba(255,255,255,0.03)",
                  border: `1px solid ${
                    activeTab === tab.id
                      ? "rgba(139,92,246,0.3)"
                      : "rgba(255,255,255,0.05)"
                  }`,
                  color:
                    activeTab === tab.id
                      ? "#8b5cf6"
                      : "rgba(255,255,255,0.5)",
                }}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </motion.button>
            );
          })}

          {/* Danger Zone */}
          <motion.button
            whileHover={{ x: 4 }}
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3
              rounded-xl transition-all text-left mt-4
              border border-red-500/20 text-red-400
              hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Sign Out</span>
          </motion.button>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass p-6 rounded-2xl space-y-6"
            >
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div
                    className="w-20 h-20 rounded-2xl
                    bg-gradient-to-br from-violet-500 to-blue-600
                    flex items-center justify-center
                    text-white font-black text-2xl"
                  >
                    {user?.displayName
                      ? getInitials(user.displayName)
                      : "U"}
                  </div>
                  <button
                    className="absolute -bottom-2 -right-2
                    w-8 h-8 rounded-xl bg-violet-500
                    flex items-center justify-center
                    hover:bg-violet-600 transition-colors"
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">
                    {user?.displayName}
                  </h3>
                  <p className="text-white/40 text-sm">{user?.email}</p>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full
                    bg-violet-500/20 text-violet-400
                    border border-violet-500/30 mt-1 inline-block"
                  >
                    {user?.role || "user"}
                  </span>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    Display Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2
                      -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10
                        rounded-xl pl-10 pr-4 py-3 text-white text-sm
                        outline-none focus:border-violet-500/50
                        transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2
                      -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="w-full bg-white/3 border border-white/5
                        rounded-xl pl-10 pr-4 py-3 text-white/40
                        text-sm outline-none cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={3}
                    className="w-full bg-white/5 border border-white/10
                      rounded-xl p-4 text-white text-sm
                      placeholder:text-white/20 outline-none
                      focus:border-violet-500/50 transition-all resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3
                    rounded-xl bg-gradient-to-r from-violet-600
                    to-blue-600 text-white font-bold
                    hover:shadow-lg hover:shadow-violet-500/30
                    transition-all"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </motion.button>
              </div>

              {/* Stats */}
              <div className="pt-4 border-t border-white/5">
                <h4 className="text-white font-bold mb-4">
                  Your Statistics
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    {
                      label: "Interviews",
                      value: user?.stats?.totalInterviews || 0,
                      color: "#8b5cf6",
                    },
                    {
                      label: "Avg Score",
                      value: `${user?.stats?.averageScore || 0}%`,
                      color: "#f59e0b",
                    },
                    {
                      label: "Hours",
                      value: user?.stats?.hoursPracticed || 0,
                      color: "#06b6d4",
                    },
                    {
                      label: "Streak",
                      value: `${user?.stats?.currentStreak || 0}d`,
                      color: "#10b981",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="p-3 rounded-xl bg-white/3
                        border border-white/5 text-center"
                    >
                      <p
                        className="text-xl font-black"
                        style={{ color: stat.color }}
                      >
                        {stat.value}
                      </p>
                      <p className="text-white/40 text-xs">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass p-6 rounded-2xl space-y-6"
            >
              <h3 className="text-white font-bold text-lg">
                Security Settings
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2
                      -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10
                        rounded-xl pl-10 pr-4 py-3 text-white text-sm
                        placeholder:text-white/20 outline-none
                        focus:border-violet-500/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2
                      -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10
                        rounded-xl pl-10 pr-4 py-3 text-white text-sm
                        placeholder:text-white/20 outline-none
                        focus:border-violet-500/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2
                      -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10
                        rounded-xl pl-10 pr-4 py-3 text-white text-sm
                        placeholder:text-white/20 outline-none
                        focus:border-violet-500/50 transition-all"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3
                    rounded-xl bg-gradient-to-r from-violet-600
                    to-blue-600 text-white font-bold
                    hover:shadow-lg hover:shadow-violet-500/30
                    transition-all"
                >
                  <Save className="w-4 h-4" />
                  Update Password
                </motion.button>
              </div>

              {/* Danger Zone */}
              <div className="pt-4 border-t border-red-500/20">
                <h4 className="text-red-400 font-bold mb-2">
                  Danger Zone
                </h4>
                <p className="text-white/30 text-sm mb-4">
                  Once you delete your account, there is no going back.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3
                    rounded-xl border border-red-500/30
                    text-red-400 font-bold
                    hover:bg-red-500/10 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass p-6 rounded-2xl space-y-6"
            >
              <h3 className="text-white font-bold text-lg">
                Preferences
              </h3>

              <div className="space-y-4">
                {[
                  {
                    label: "Push Notifications",
                    description: "Get notified about your progress",
                    value: notifications,
                    onChange: setNotifications,
                    color: "#8b5cf6",
                  },
                  {
                    label: "Sound Effects",
                    description: "Play sounds during interviews",
                    value: soundEffects,
                    onChange: setSoundEffects,
                    color: "#06b6d4",
                  },
                ].map((pref) => (
                  <div
                    key={pref.label}
                    className="flex items-center justify-between
                      p-4 rounded-xl bg-white/3 border border-white/5"
                  >
                    <div>
                      <p className="text-white font-medium text-sm">
                        {pref.label}
                      </p>
                      <p className="text-white/30 text-xs">
                        {pref.description}
                      </p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => pref.onChange(!pref.value)}
                      className="relative w-12 h-6 rounded-full
                        transition-all duration-300"
                      style={{
                        background: pref.value
                          ? pref.color
                          : "rgba(255,255,255,0.1)",
                      }}
                    >
                      <motion.div
                        animate={{ x: pref.value ? 24 : 2 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-1 w-4 h-4
                          rounded-full bg-white shadow-sm"
                      />
                    </motion.button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}