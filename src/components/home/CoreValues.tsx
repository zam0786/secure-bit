import { motion } from "framer-motion";
import { ShieldCheck, Handshake, TrendingUp, Award, Lightbulb } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    text: "Do the right thing, especially when the right path is difficult.",
  },
  {
    icon: Handshake,
    title: "Trust",
    text: "Protect what matters, communicate transparently, and build lasting partnerships.",
  },
  {
    icon: TrendingUp,
    title: "Business Enablement",
    text: "Make security an accelerator for growth, not a barrier to progress.",
  },
  {
    icon: Award,
    title: "Excellence",
    text: "Deliver high-quality, precise, and measurable outcomes.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    text: "Challenge the status quo through smarter technology, automation, and modern risk management.",
  },
];

const CoreValues = () => {
  return (
    <section className="py-24 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-14">
          <p className="eyebrow mb-4">What drives us</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Our Core Values</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((value, i) => (
            <motion.article
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="surface-card"
            >
              <value.icon className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{value.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
