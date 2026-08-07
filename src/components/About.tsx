import { Target, Eye, Handshake } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  { icon: Target, title: "Mission", text: "Make enterprise-grade security accessible to teams of every size." },
  { icon: Eye, title: "Transparency", text: "Plain-language reporting, no scare tactics, no hidden scope." },
  { icon: Handshake, title: "Partnership", text: "We embed with your team rather than hand over a PDF and leave." },
];

const About = () => {
  return (
    <section id="about" className="py-24 relative bg-card/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">About Us</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
              Built By Defenders, For Defenders
            </h2>
            <p className="text-muted-foreground text-lg">
              SecureBit started in 2011 as a small team of incident responders who were tired
              of watching preventable breaches. Today we protect over 500 organizations across
              finance, healthcare, and critical infrastructure — with the same hands-on approach
              we started with.
            </p>
          </motion.div>

          <div className="space-y-6">
            {values.map((v, index) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex gap-4 p-5 rounded-xl bg-background border border-border"
              >
                <v.icon className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{v.title}</h3>
                  <p className="text-muted-foreground text-sm">{v.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;