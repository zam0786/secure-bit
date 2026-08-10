import {
  ClipboardCheck,
  UserCog,
  Cloud,
  Siren,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: ClipboardCheck,
    title: "Security Audits and Risk Assessments",
    description:
      "Protect your assets and sensitive information with a comprehensive security risk assessment. We identify, analyze, and prioritize potential threats while recommending controls to prevent or reduce the impact of cyberattacks.",
    features: ["PCI DSS", "ISO 27001", "HIPAA"],
  },
  {
    icon: UserCog,
    title: "Virtual CISO Support",
    description:
      "Access experienced cybersecurity leadership without the cost of hiring a full-time executive. Our virtual CISO services provide strategic guidance and hands-on support for your security program.",
    features: [
      "Strategy & Planning",
      "Security Assessments",
      "Budgeting & Technology Planning",
      "Policy Development",
      "Risk Management",
      "Program Management",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Security",
    description:
      "Strengthen your cloud security posture with solutions designed to scan and assess your containers, images, registries, and cloud environments. Reduce cloud-related risks and gain greater confidence in your organization’s security.",
    features: ["Containers", "Images", "Registries", "Cloud Environments"],
  },
  {
    icon: Siren,
    title: "Incident Response and Vulnerability Management",
    description:
      "Get prompt support for urgent security concerns. Our specialists assist with incident handling, vulnerability management, penetration testing, IT risk assessments, security control reviews, and remediation planning.",
    features: [
      "Incident Handling",
      "Vulnerability Management",
      "Penetration Testing",
      "IT Risk Assessments",
      "Security Control Reviews",
      "Remediation Planning",
    ],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 mb-6">
            Comprehensive Cybersecurity Services
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Our experienced security consultants assess your current security posture, identify
            vulnerabilities, and develop a customized plan to strengthen your defenses.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(185_100%_50%/0.1)]"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>

              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
