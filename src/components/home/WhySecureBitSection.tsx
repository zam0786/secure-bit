import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Scale, Wrench, Award, Handshake } from "lucide-react";

const cards = [
  {
    icon: Briefcase,
    title: "Business-Focused",
    text: "We connect cybersecurity decisions to business objectives, operational impact, and risk.",
  },
  {
    icon: Scale,
    title: "Risk-Based",
    text: "We help organizations prioritize the risks that matter most.",
  },
  {
    icon: Wrench,
    title: "Practical",
    text: "Our recommendations are designed to be implemented, operated, and maintained.",
  },
  {
    icon: Award,
    title: "Experienced",
    text: "We bring mature cybersecurity practices to organizations that need practical security expertise.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnership",
    text: "We work with clients to continuously improve their security posture.",
  },
];

const WhySecureBitSection = () => {
  return (
    <section className="py-24 border-b border-border bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-14">
          <p className="eyebrow mb-4">Why us</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Why SecureBit?</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="surface-card"
            >
              <card.icon className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.text}</p>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Want the detail?{" "}
          <Link to="/why-securebit" className="text-primary hover:underline">
            See how we work with clients
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default WhySecureBitSection;