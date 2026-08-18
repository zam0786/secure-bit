import Seo from "@/components/Seo";
import Hero from "@/components/home/Hero";
import Challenges from "@/components/home/Challenges";
import ServicesOverview from "@/components/home/ServicesOverview";
import RiskToResilience from "@/components/home/RiskToResilience";
import WhySecureBitSection from "@/components/home/WhySecureBitSection";
import CoreValues from "@/components/home/CoreValues";
import WhoWeHelp from "@/components/home/WhoWeHelp";
import EngagementModels from "@/components/home/EngagementModels";
import InsightsTeaser from "@/components/home/InsightsTeaser";
import AboutSummary from "@/components/home/AboutSummary";
import FinalCTA from "@/components/home/FinalCTA";

const Index = () => {
  return (
    <>
      <Seo
        title="SecureBit | Cybersecurity Consulting & Risk Management"
        description="SecureBit helps businesses identify and reduce cyber risk through practical cybersecurity consulting, vulnerability management, cloud security, compliance, incident readiness, and AI security."
        path="/"
      />
      <Hero />
      <Challenges />
      <ServicesOverview />
      <RiskToResilience />
      <WhySecureBitSection />
      <CoreValues />
      <WhoWeHelp />
      <EngagementModels />
      <InsightsTeaser />
      <AboutSummary />
      <FinalCTA />
    </>
  );
};

export default Index;
