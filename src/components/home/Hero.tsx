import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-cyber-grid opacity-[0.12]" aria-hidden="true" />
      <div
        className="absolute -top-40 right-0 w-[520px] h-[520px] rounded-full bg-primary/10 blur-[160px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10 py-24 md:py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/60 text-sm text-muted-foreground mb-8"
          >
            <Shield className="w-4 h-4 text-primary" aria-hidden="true" />
            Security Re-engineered. Risk Managed. Business Enabled.
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6"
          >
            Cybersecurity That <span className="text-gradient-cyber">Protects Your Business</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mb-5"
          >
            SecureBit helps organizations identify cyber risk, protect critical systems and data,
            strengthen their security programs, and respond confidently to evolving threats.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base text-foreground/80 font-medium mb-10"
          >
            Practical security. Measurable risk reduction. Business confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="cyber" size="xl" asChild>
              <Link to="/contact">
                Book a Security Consultation
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="cyberOutline" size="xl" asChild>
              <Link to="/services">Explore Our Services</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;