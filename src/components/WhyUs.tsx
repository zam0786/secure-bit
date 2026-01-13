import { Award, Clock, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Users, value: "500+", label: "Clients Protected" },
  { icon: Clock, value: "24/7", label: "Support Available" },
  { icon: TrendingUp, value: "99.9%", label: "Threat Detection" },
];

const reasons = [
  {
    title: "Industry-Leading Expertise",
    description: "Our team includes certified professionals with backgrounds in military intelligence, Fortune 500 security, and cutting-edge research.",
  },
  {
    title: "Proactive Defense",
    description: "We don't just react to threats—we anticipate them. Our approach focuses on prevention through continuous monitoring and threat intelligence.",
  },
  {
    title: "Tailored Solutions",
    description: "No cookie-cutter approaches. Every security strategy is customized to your industry, size, and specific risk profile.",
  },
  {
    title: "Measurable Results",
    description: "Track your security posture improvement with detailed metrics, regular reporting, and actionable insights.",
  },
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-24 relative bg-card/50">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-xl bg-background border border-border"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
              Security That Evolves With Threats
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              In a world where cyber threats evolve daily, you need a security partner 
              that stays ahead. We combine cutting-edge technology with human expertise 
              to provide unmatched protection.
            </p>

            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-cyber-grid opacity-20" />
              <div className="relative z-10 text-center p-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center glow-cyber">
                  <Award className="w-12 h-12 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">Certified Excellence</h3>
                <p className="text-muted-foreground">
                  ISO 27001 · SOC 2 · CISSP · CEH
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
