import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FinalCTAProps {
  heading?: string;
  text?: string;
}

const FinalCTA = ({
  heading = "Ready to Strengthen Your Cybersecurity?",
  text = "Whether you need help managing vulnerabilities, securing your cloud environment, preparing for compliance, improving your security program, or navigating emerging AI risks, SecureBit can help.",
}: FinalCTAProps) => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-[0.1]" aria-hidden="true" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center rounded-2xl border border-border bg-card p-10 md:p-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-5">{heading}</h2>
          <p className="text-muted-foreground text-lg mb-9">{text}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cyber" size="xl" asChild>
              <Link to="/contact">
                Book a Security Consultation
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="cyberOutline" size="xl" asChild>
              <Link to="/contact">Contact SecureBit</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;