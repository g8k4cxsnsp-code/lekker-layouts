import { HeroSection } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyCustomCode } from "@/components/sections/why-custom-code";
import { ServicesOverview } from "@/components/sections/services-overview";
import { CTASection } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <WhyCustomCode />
      <ServicesOverview />
      <CTASection />
    </>
  );
}
