import { ShieldCheck, Users, Cloud, Mail, Wifi, Router, Headset, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { icon: Briefcase, label: "Virtual CIO services" },
  { icon: Headset, label: "Fully managed IT support" },
  { icon: Users, label: "24/7 technical assistance" },
  { icon: Cloud, label: "Cloud services" },
  { icon: Mail, label: "Hosted email" },
  { icon: ShieldCheck, label: "Cybersecurity management" },
  { icon: Wifi, label: "Wi-Fi event rentals" },
  { icon: Router, label: "Point-to-point internet services" },
];

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
            SecureBit is a professional, forward-thinking managed cybersecurity and IT services
            provider serving businesses across the Greater Toronto and Hamilton Area since 2008.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-2xl font-semibold mb-4">
              Technology Solutions Built Around Your Business
            </h3>
            <p className="text-muted-foreground text-lg mb-6">
              We help organizations strengthen their technology, protect sensitive information,
              and operate more efficiently through reliable, business-focused solutions.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {services.map((service) => (
                <div
                  key={service.label}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border"
                >
                  <service.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-sm">{service.label}</span>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground text-lg">
              Our clients represent a wide range of industries, including sports and entertainment,
              wholesale, healthcare, professional services, and more. Regardless of your industry
              or organization size, our team works closely with you to understand your goals and
              deliver solutions that fit your needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="font-display text-2xl font-semibold mb-4">
                Why Choose SecureBIT?
              </h3>
              <div className="space-y-3">
                {reasons.map((reason) => (
                  <div key={reason} className="flex gap-3 items-start">
                    <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
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
      </div>
    </section>
  );
};

export default About;
