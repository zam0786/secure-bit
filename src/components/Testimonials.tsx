import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "SecureBit caught an intrusion attempt within minutes. Their team had it contained before our own alerts even fired.",
    name: "Dana Whitfield",
    role: "CTO, Northline Fintech",
  },
  {
    quote:
      "The penetration test report was the most actionable security document we have ever received. No fluff, just fixes.",
    name: "Marcus Ade",
    role: "Head of Engineering, Vantiq",
  },
  {
    quote:
      "We passed SOC 2 on the first attempt. Their team handled the hard parts and taught us the rest.",
    name: "Priya Raman",
    role: "COO, Cleargrid Health",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">
            Trusted By Security-First Teams
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"
            >
              <Quote className="w-8 h-8 text-primary mb-4" />
              <p className="text-muted-foreground mb-6">{t.quote}</p>
              <div>
                <div className="font-display font-semibold text-foreground">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;