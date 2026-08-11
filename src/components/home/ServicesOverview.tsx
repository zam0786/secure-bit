import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

const ServicesOverview = () => {
  const homeServices = services.slice(0, 6);

  return (
    <section id="services" className="py-24 border-b border-border bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-14">
          <p className="eyebrow mb-4">Services</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-5">
            Security Expertise Built Around Your Business
          </h2>
          <p className="text-muted-foreground text-lg">
            From cybersecurity strategy and vulnerability management to cloud security, compliance,
            incident readiness, and AI security, SecureBit provides practical solutions designed
            around your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {homeServices.map((service, i) => (
            <motion.article
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="surface-card group flex flex-col"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="font-display text-sm text-primary tracking-widest">
                  {service.number}
                </span>
                <service.icon className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                {service.summary}
              </p>
              <Link
                to={service.href ?? `/services#${service.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Learn more
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-12">
          <Button variant="cyber" asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;