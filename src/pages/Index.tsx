import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>SecureBit | Cybersecurity Consulting &amp; Pentesting Toronto</title>
        <meta
          name="description"
          content="SecureBit delivers penetration testing, security consulting, managed security and awareness training for Toronto businesses. Protect your business before the threat strikes."
        />
        <link rel="canonical" href="https://secure-bit.lovable.app/" />
        <meta property="og:title" content="SecureBit | Cybersecurity Consulting &amp; Pentesting Toronto" />
        <meta
          property="og:description"
          content="Penetration testing, security consulting, managed security and awareness training for Toronto businesses."
        />
        <meta property="og:url" content="https://secure-bit.lovable.app/" />
      </Helmet>
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <Testimonials />
      <About />
      <Blog />
      <Contact />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
