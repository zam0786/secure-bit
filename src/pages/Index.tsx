import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Process from "@/components/Process";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>SecureBit | Cybersecurity Consulting & Risk Assessments</title>
        <meta
          name="description"
          content="SecureBit delivers cybersecurity consulting, risk assessments, virtual CISO support, cloud security, and incident response for businesses of every size."
        />
        <link rel="canonical" href="https://secure-bit.lovable.app/" />
        <meta
          property="og:title"
          content="SecureBit | Cybersecurity Consulting & Risk Assessments"
        />
        <meta
          property="og:description"
          content="Practical, cost-effective cybersecurity solutions including risk assessments, vCISO support, cloud security, and incident response."
        />
        <meta property="og:url" content="https://secure-bit.lovable.app/" />
      </Helmet>
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <Testimonials />
      <About />
      <Process />
      <Blog />
      <Contact />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
