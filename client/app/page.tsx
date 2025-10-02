import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/layout/HeroSection";
import { FocusStatsSection } from "@/components/layout/FocusStatsSection";
import { ProductivitySection } from "@/components/layout/ProductivitySection";
import { DepartmentsSection } from "@/components/layout/DepartmentsSection";
import { ThirtyDaySection } from "@/components/layout/ThirtyDaySection";
import { TestimonialSection } from "@/components/layout/TestimonialSection";
import { GreenStatsSection } from "@/components/layout/GreenStatsSection";
import { SecondTestimonialSection } from "@/components/layout/SecondTestimonialSection";
import { EnterpriseSection } from "@/components/layout/EnterpriseSection";
import { Footer } from "@/components/layout/Footer/Footer";
import { IntegrationShowcaseSection } from "@/components/layout/IntegrationShowcaseSection";


export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Header />
      <HeroSection />
      <FocusStatsSection />
      <ProductivitySection />
      <SecondTestimonialSection />
      <DepartmentsSection />
      <ThirtyDaySection />
      <TestimonialSection />
      <GreenStatsSection />
      <IntegrationShowcaseSection />
      <EnterpriseSection />
      <Footer />
    </main>
  );
}