import { motion } from "framer-motion";
import { Mail, Phone, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const details = [
  { icon: Mail, label: "Email", value: "team@securebit.io" },
  { icon: Phone, label: "Phone", value: "+1 (555) 018-4420" },
  { icon: Clock, label: "Response Time", value: "Within 24 hours" },
];

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative bg-card/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Contact
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
              Talk To Our Security Team
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Tell us what you are protecting and we will map out the fastest path to
              closing your biggest gaps. No sales pressure, just a straight assessment.
            </p>

            <div className="space-y-4">
              {details.map((d) => (
                <div key={d.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <d.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{d.label}</div>
                    <div className="font-medium text-foreground">{d.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;