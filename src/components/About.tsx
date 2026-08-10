import { ShieldCheck, Target, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  "Decades of combined cybersecurity and IT experience",
  "A proven record of helping businesses improve their security",
  "Personalized service and attention to detail",
  "Practical, cost-effective solutions",
  "Ongoing monitoring and support",
  "Technology recommendations aligned with your business objectives",
];

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-primary font-medium text-sm uppercase tracking-wider"
          >
            About Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6"
          >
            SecureBit
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            A professional, forward-thinking managed cybersecurity and IT services provider
            serving businesses across the Greater Toronto and Hamilton Area since 2008.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-xl bg-card border border-border"
          >
            <Rocket className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-display text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-muted-foreground text-lg mb-4">
              At SecureBit, our vision is to help businesses stay secure, resilient, and confident
              in a constantly changing digital world.
            </p>
            <p className="text-muted-foreground text-lg mb-4">
              We provide practical and reliable cybersecurity solutions tailored to each client’s
              needs. We help businesses manage risk, protect their data and critical systems, meet
              compliance requirements, and stay prepared for evolving cyber threats.
            </p>
            <p className="text-muted-foreground text-lg">
              Our goal is simple: protect what matters, reduce risk, and help businesses grow with
              confidence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-xl bg-card border border-border"
          >
            <Target className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-display text-2xl font-semibold mb-4">Mission Statement</h3>
            <p className="text-muted-foreground text-lg">
              SecureBit’s mission is to simplify cybersecurity and turn risk into resilience. We
              provide practical, business-focused security solutions that protect critical systems
              and data, strengthen security maturity, and help organizations confidently navigate an
              evolving threat landscape.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-display text-2xl font-semibold mb-4 text-center">
              Why Choose SecureBit?
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {reasons.map((reason) => (
                <div key={reason} className="flex gap-3 items-start">
                  <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20 text-center">
            <p className="text-muted-foreground mb-4">
              Don’t wait until a cyber incident disrupts your operations. Contact SecureBit today
              to schedule a consultation and take the next step toward protecting your business.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Schedule a Consultation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
