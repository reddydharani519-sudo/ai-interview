"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Zap, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { FloatingOrbs } from "@/components/background/FloatingOrbs";
import { NeuralNetwork } from "@/components/background/NeuralNetwork";

const getPasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColors = ["", "#ef4444", "#f59e0b", "#3b82f6", "#10b981"];

export default function SignupPage() {
  const router = useRouter();
  const { signup, loginWithGoogle, loading, error } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const passwordStrength = getPasswordStrength(password);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name || !email || !password) {
      setFormError("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      setFormError("Password must be at least 8 characters");
      return;
    }

    try {
      await signup(email, password, name);
      router.push("/dashboard");
    } catch (err: any) {
      setFormError(err.message || "Signup failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      router.push("/dashboard");
    } catch (err: any) {
      setFormError(err.message || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center
      justify-center relative overflow-hidden py-10">
      <NeuralNetwork />
      <FloatingOrbs />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="relative w-12 h-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-xl border-2
                  border-transparent border-t-violet-500 border-r-blue-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl">🧠</span>
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-white font-black text-xl leading-none">
                AI Interview
              </h1>
              <p className="text-violet-400 font-black text-sm">PRO</p>
            </div>
          </Link>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass p-8 rounded-3xl"
        >
          <h2 className="text-white font-black text-2xl mb-1">
            Create Account
          </h2>
          <p className="text-white/40 text-sm mb-8">
            Start your AI interview journey today
          </p>

          {/* Google Login */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3
              py-3 rounded-xl border border-white/10 bg-white/5
              text-white font-medium hover:bg-white/10
              transition-all duration-200 mb-6 disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">or continue with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-white/60 text-sm mb-2 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2
                  w-4 h-4 text-white/30" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10
                    rounded-xl pl-10 pr-4 py-3 text-white text-sm
                    placeholder:text-white/20 outline-none
                    focus:border-violet-500/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-white/60 text-sm mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2
                  w-4 h-4 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10
                    rounded-xl pl-10 pr-4 py-3 text-white text-sm
                    placeholder:text-white/20 outline-none
                    focus:border-violet-500/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-white/60 text-sm mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2
                  w-4 h-4 text-white/30" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10
                    rounded-xl pl-10 pr-12 py-3 text-white text-sm
                    placeholder:text-white/20 outline-none
                    focus:border-violet-500/50 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                    text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Password Strength */}
              {password.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2"
                >
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          background:
                            level <= passwordStrength
                              ? strengthColors[passwordStrength]
                              : "rgba(255,255,255,0.1)",
                        }}
                      />
                    ))}
                  </div>
                  <p
                    className="text-xs"
                    style={{
                      color: strengthColors[passwordStrength],
                    }}
                  >
                    {strengthLabels[passwordStrength]}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Error */}
            {(formError || error) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-red-500/10
                  border border-red-500/20 text-red-400 text-sm"
              >
                {formError || error}
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSignup}
              disabled={loading}
              className="w-full py-3 rounded-xl
                bg-gradient-to-r from-violet-600 to-blue-600
                text-white font-bold flex items-center
                justify-center gap-2 hover:shadow-lg
                hover:shadow-violet-500/30 transition-all
                duration-300 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30
                  border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>

            {/* Terms */}
            <p className="text-white/25 text-xs text-center">
              By signing up you agree to our{" "}
              <Link href="#" className="text-violet-400 hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-violet-400 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Login Link */}
          <p className="text-center text-white/40 text-sm mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-violet-400 hover:text-violet-300
                transition-colors font-medium"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}