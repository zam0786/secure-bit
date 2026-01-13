import { GraduationCap, Users, Search, ShieldCheck, FileCheck, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: GraduationCap,
    title: "Security Awareness Training",
    description: "Comprehensive employee training programs that transform your workforce into your first line of defense against cyber threats.",
    features: ["Phishing Simulations", "Interactive Modules", "Compliance Training"],
  },
  {
    icon: Users,
    title: "Security Consulting",
    description: "Expert guidance to assess, design, and implement robust security strategies tailored to your organization's unique needs.",
    features: ["Risk Assessment", "Security Architecture", "Compliance Advisory"],
  },
  {
    icon: Search,
    title: "Penetration Testing",
    description: "Identify vulnerabilities before attackers do with our comprehensive penetration testing and ethical hacking services.",
    features: ["Network Testing", "Web App Testing", "Social Engineering"],
  },
  {
    icon: ShieldCheck,
    title: "Incident Response",
    description: "24/7 rapid response team ready to contain, investigate, and remediate security incidents when they occur.",
    features: ["24/7 Monitoring", "Forensic Analysis", "Recovery Planning"],
  },
  {
    icon: FileCheck,
    title: "Compliance Management",
    description: "Navigate complex regulatory requirements with expert guidance on GDPR, HIPAA, SOC 2, and industry-specific standards.",
    features: ["Gap Analysis", "Policy Development", "Audit Preparation"],
  },
  {
    icon: Headphones,
    title: "Managed Security",
    description: "Continuous security monitoring and management so you can focus on your business while we protect it.",
    features: ["SIEM Management", "Threat Intelligence", "Vulnerability Management"],
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
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 mb-6">
            Complete Security Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From awareness training to incident response, we provide end-to-end 
            cybersecurity services to protect your organization.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
