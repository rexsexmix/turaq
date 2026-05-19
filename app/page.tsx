import { Suspense } from "react";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { DemoLoginNotice } from "@/components/home/DemoLoginNotice";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { NewBuildingsSection } from "@/components/home/NewBuildingsSection";
import { PropertyGrid } from "@/components/home/PropertyGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface text-text-primary">
      <Suspense fallback={null}>
        <DemoLoginNotice />
      </Suspense>
      <Header />
      <main>
        <HeroSection />
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
          <CategoryGrid />
        </div>
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
          <PropertyGrid />
        </div>
        <FeaturesSection />
        <NewBuildingsSection />
      </main>
      <Footer />
    </div>
  );
}
