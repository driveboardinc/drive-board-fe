import { Navbar } from "@/components/navbar";
import { Benefits, CTABanner, Features, HeroSection, ServicesSection } from "./HomePage";
import { Footer } from "@/components/footer";

export function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Benefits />
      <ServicesSection />
      <Features />
      <CTABanner />
      <Footer />
    </>
  );
}
