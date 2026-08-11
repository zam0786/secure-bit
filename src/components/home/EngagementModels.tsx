import { motion } from "framer-motion";

const models = [
  {
    title: "Project-Based",
    text: "Defined cybersecurity assessments, implementations, and remediation projects.",
  },
  {
    title: "Security Retainer",
    text: "Ongoing cybersecurity expertise and advisory support.",
  },
  {
    title: "Fractional CISO",
    text: "Executive cybersecurity leadership without the cost of a full-time CISO.",
  },
  {
    title: "Advisory",
    text: "On-demand expertise for critical security decisions, risk assessments, architecture, and security challenges.",
  },
];

const EngagementModels = () => {
  return (
    <section className="py-24 border-b border-border bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-14">
          <p className="eyebrow mb-4">Engagement models</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Flexible Ways to Work With SecureBit
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {models.map((model, i) => (
            <motion.article
              key={model.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="surface-card"
            >
              <h3 className="font-display text-lg font-semibold mb-2">{model.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{model.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngagementModels;