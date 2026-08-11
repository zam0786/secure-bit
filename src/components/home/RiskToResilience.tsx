import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Understand",
    text: "Understand the business, technology, objectives, and security challenges.",
  },
  {
    number: "02",
    title: "Assess",
    text: "Identify vulnerabilities, risks, control gaps, and opportunities.",
  },
  {
    number: "03",
    title: "Prioritize",
    text: "Translate technical findings into business-focused priorities.",
  },
  {
    number: "04",
    title: "Improve",
    text: "Implement practical improvements and continuously strengthen the security posture.",
  },
];

const RiskToResilience = () => {
  return (
    <section className="py-24 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-14">
          <p className="eyebrow mb-4">Our approach</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            From Cyber Risk to Business Resilience
          </h2>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="relative rounded-xl border border-border bg-card p-6"
            >
              <span className="font-display text-3xl font-bold text-primary/40">{step.number}</span>
              <h3 className="font-display text-lg font-semibold mt-3 mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default RiskToResilience;