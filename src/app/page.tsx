import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { SubjectsSection } from "@/components/landing/SubjectsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTABanner } from "@/components/landing/CTABanner";
import { Footer } from "@/components/landing/Footer";
import { NeuralNetwork } from "@/components/background/NeuralNetwork";
import { FloatingOrbs } from "@/components/background/FloatingOrbs";
import { ParticleSystem } from "@/components/background/ParticleSystem";
import { MouseSpotlight } from "@/components/background/MouseSpotlight";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] overflow-x-hidden">
      {/* Background */}
      <NeuralNetwork />
      <FloatingOrbs />
      <ParticleSystem />
      <MouseSpotlight />

      {/* Content */}
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <SubjectsSection />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </main>
  );
}