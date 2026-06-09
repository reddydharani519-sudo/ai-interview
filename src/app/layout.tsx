import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AI Interview Pro — Master Interviews With AI",
  description:
    "Practice real interviews. Receive instant AI feedback. Track your progress. Get hired faster.",
  keywords: [
    "AI interview",
    "interview practice",
    "mock interview",
    "AI feedback",
    "job preparation",
    "career",
  ],
  authors: [{ name: "AI Interview Pro" }],
  openGraph: {
    title: "AI Interview Pro — Master Interviews With AI",
    description:
      "Practice real interviews. Receive instant AI feedback. Get hired faster.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="animated-gradient noise min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}