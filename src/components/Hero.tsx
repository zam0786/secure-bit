import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Floating Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[80px] animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8">
              <Shield className="w-4 h-4" />
              Enterprise-Grade Security Solutions
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Protect Your Business with{" "}
            <span className="text-gradient-cyber">Expert Cybersecurity</span>{" "}
            Solutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6"
          >
            In today’s digital landscape, cyber threats are constant—and no business is immune.
            From startups to established enterprises, organizations of every size face risks from
            hackers, malware, data breaches, and system vulnerabilities.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl text-foreground max-w-3xl mx-auto mb-10"
          >
            At <strong>SecureBit</strong>, we help businesses protect their systems, data, and
            operations with practical, cost-effective cybersecurity solutions tailored to their
            needs and budget.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="cyber" size="xl" asChild>
              <a href="#contact">
                <Calendar className="w-5 h-5" />
                Book a Cybersecurity Appointment
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="cyberOutline" size="xl" asChild>
              <a href="#services">View Services</a>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-border/50"
          >
            <p className="text-muted-foreground text-sm mb-4">Trusted across industries</p>
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
              {["Finance", "Healthcare", "Professional Services", "Technology"].map((sector) => (
                <span key={sector} className="text-foreground/70 font-display font-semibold">
                  {sector}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
