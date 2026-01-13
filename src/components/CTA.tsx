import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

const CTA = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Ready to Secure Your{" "}
            <span className="text-gradient-cyber">Future</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Don't wait for a breach. Get a free security assessment and discover 
            how we can protect your organization today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <h3 className="font-display text-2xl font-bold mb-4">
                Get in Touch
              </h3>
              <p className="text-muted-foreground">
                Our security experts are ready to help protect your business. 
                Reach out today for a free consultation.
              </p>
            </div>

            <div className="space-y-6">
              <a
                href="mailto:contact@securebit.ca"
                className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email Us</p>
                  <p className="text-foreground font-medium">contact@securebit.ca</p>
                </div>
              </a>

              <a
                href="tel:+14165551234"
                className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Call Us</p>
                  <p className="text-foreground font-medium">+1 (416) 555-1234</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Visit Us</p>
                  <p className="text-foreground font-medium">Toronto, Ontario, Canada</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-2">Response Time</p>
              <p className="text-foreground font-display font-semibold">
                We typically respond within 24 hours
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
