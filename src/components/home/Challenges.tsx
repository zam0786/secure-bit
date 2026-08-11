import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ListChecks, TrendingUp, Cloud, BrainCircuit } from "lucide-react";

const cards = [
  {
    icon: ListChecks,
    title: "Too Many Vulnerabilities",
    text: "Identify what matters most and prioritize remediation based on risk.",
  },
  {
    icon: TrendingUp,
    title: "Growing Cyber Risk",
    text: "Understand where your organization is exposed and what to do next.",
  },
  {
    icon: Cloud,
    title: "Complex Cloud Environments",
    text: "Improve security across Azure, AWS, GCP, and modern infrastructure.",
  },
  {
    icon: BrainCircuit,
    title: "Emerging AI Risks",
    text: "Adopt AI while protecting sensitive information and managing emerging security risks.",
  },
];

const Challenges = () => {
  return (
    <section className="py-24 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-14">
          <p className="eyebrow mb-4">The challenge</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-5">
            Cybersecurity Shouldn't Be Complicated
          </h2>
          <p className="text-muted-foreground text-lg">
            Security teams and business leaders often face too many vulnerabilities, complex
            technology environments, increasing compliance requirements, emerging AI risks, and
            limited resources. SecureBit helps turn those challenges into clear priorities and
            practical actions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="surface-card"
            >
              <card.icon className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.text}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-12">
          <Button variant="cyberOutline" asChild>
            <Link to="/contact">Talk to a Security Advisor</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Challenges;