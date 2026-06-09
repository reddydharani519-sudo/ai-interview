"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/shared/Sidebar";
import { TopNav } from "@/components/shared/TopNav";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { FloatingOrbs } from "@/components/background/FloatingOrbs";
import { NeuralNetwork } from "@/components/background/NeuralNetwork";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
    if (!loading && user && user.role !== "admin") {
      router.push("/dashboard");
    }
  }, [user, loading]);

  if (loading) return <LoadingScreen />;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050505] relative">
      <NeuralNetwork />
      <FloatingOrbs />
      <Sidebar />
      <TopNav />
      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}