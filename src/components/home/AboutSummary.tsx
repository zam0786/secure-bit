import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutSummary = () => {
  return (
    <section id="about" className="py-24 border-b border-border bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-14">
          <p className="eyebrow mb-4">About SecureBit</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-5">
            Cybersecurity Expertise With a Business Perspective
          </h2>
          <p className="text-muted-foreground text-lg">
            SecureBit helps organizations identify and reduce cyber risk through practical,
            business-focused cybersecurity solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="surface-card"
          >
            <Eye className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
            <h3 className="font-display text-lg font-semibold mb-2">Our Vision</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              To help businesses stay secure, resilient, and confident in a constantly changing
              digital world.
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="surface-card"
          >
            <Target className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
            <h3 className="font-display text-lg font-semibold mb-2">Our Mission</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              To simplify cybersecurity and turn risk into resilience with practical,
              business-focused security solutions.
            </p>
          </motion.article>
        </div>

        <Button variant="cyberOutline" asChild>
          <Link to="/about">More About SecureBit</Link>
        </Button>
      </div>
    </section>
  );
};

export default AboutSummary;
