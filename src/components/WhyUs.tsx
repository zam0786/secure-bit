import { Award, Clock, PhoneCall, CheckCircle, CalendarDays, Users } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: Clock,
    title: "More than 10 years of experience",
    description: "Supporting business technology and cybersecurity for over a decade.",
  },
  {
    icon: PhoneCall,
    title: "One-hour response-time guarantee",
    description: "Rapid response for critical cybersecurity issues.",
  },
  {
    icon: CheckCircle,
    title: "Up to 97% one-call resolution rate",
    description: "Most issues are resolved on the first contact.",
  },
  {
    icon: Award,
    title: "Practical recommendations",
    description: "Advice aligned with your business goals, not generic checklists.",
  },
  {
    icon: CalendarDays,
    title: "Flexible monthly and annual plans",
    description: "Service plans that adapt to your budget and priorities.",
  },
  {
    icon: Users,
    title: "Personalized support",
    description: "Experienced security professionals dedicated to your success.",
  },
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-24 relative bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 mb-6">
            Why Choose SecureBit?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex gap-4 p-5 rounded-xl bg-background border border-border"
            >
              <reason.icon className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground text-sm">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
