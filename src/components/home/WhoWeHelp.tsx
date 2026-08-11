import { motion } from "framer-motion";
import { Building2, Rocket, Users, FileCheck } from "lucide-react";

const segments = [
  {
    icon: Building2,
    title: "Small & Mid-Sized Businesses",
    text: "Build a strong cybersecurity foundation without the cost of a large security organization.",
  },
  {
    icon: Rocket,
    title: "Growing Organizations",
    text: "Scale cybersecurity alongside your business and technology.",
  },
  {
    icon: Users,
    title: "Technology Teams",
    text: "Get specialized cybersecurity expertise when internal resources need additional support.",
  },
  {
    icon: FileCheck,
    title: "Regulated Organizations",
    text: "Strengthen security controls and prepare for compliance and customer requirements.",
  },
];

const WhoWeHelp = () => {
  return (
    <section className="py-24 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-14">
          <p className="eyebrow mb-4">Who we help</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Built for Organizations That Need Security Without the Complexity
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {segments.map((segment, i) => (
            <motion.article
              key={segment.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="surface-card flex gap-5"
            >
              <segment.icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="font-display text-lg font-semibold mb-2">{segment.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{segment.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelp;