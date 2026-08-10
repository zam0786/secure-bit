import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section id="cta" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Get Started <span className="text-gradient-cyber">Today</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Stop letting cybersecurity concerns disrupt productivity and business growth. Schedule
            a free assessment to identify your risks, receive a clear action plan, and build a
            stronger, more resilient technology environment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cyber" size="xl" asChild>
              <a href="#contact">
                <Calendar className="w-5 h-5" />
                Book a Free Assessment
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="cyberOutline" size="xl" asChild>
              <a href="#contact">Contact Our Team</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
