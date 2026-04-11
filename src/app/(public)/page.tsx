import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { HeroSection } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyCustomCode } from "@/components/sections/why-custom-code";
import { ServicesOverview } from "@/components/sections/services-overview";
import { CTASection } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <WhyCustomCode />
        <ServicesOverview />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
