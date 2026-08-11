import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/home/FinalCTA";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { services } from "@/data/services";

const Services = () => {
  return (
    <>
      <Seo
        title="Cybersecurity Services | SecureBit"
        description="Cybersecurity services from SecureBit: security strategy and advisory, vulnerability management, cloud security, GRC and compliance, incident response, AI security, and training."
        path="/services"
      />
      <PageHero
        eyebrow="Services"
        title="Cybersecurity Solutions Built Around Your Business"
        text="SecureBit helps organizations identify cyber risk, protect critical systems and data, strengthen security programs, and respond confidently to an evolving threat landscape."
      >
        <nav aria-label="Services on this page" className="flex flex-wrap gap-2">
          {services.map((service) => (
            <a
              key={service.slug}
              href={`#${service.slug}`}
              className="text-xs px-3 py-1.5 rounded-full border border-border bg-secondary/60 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
            >
              {service.shortTitle}
            </a>
          ))}
        </nav>
      </PageHero>

      {services.map((service, i) => (
        <section
          key={service.slug}
          id={service.slug}
          className={`py-20 border-b border-border scroll-mt-20 ${i % 2 === 1 ? "bg-card/30" : ""}`}
        >
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <service.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  <span className="font-display text-sm text-primary tracking-widest">
                    {service.number}
                  </span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-5">{service.title}</h2>
                <h3 className="font-display text-sm uppercase tracking-[0.14em] text-muted-foreground mb-2">
                  What it is
                </h3>
                <p className="text-muted-foreground mb-6">{service.what}</p>
                <h3 className="font-display text-sm uppercase tracking-[0.14em] text-muted-foreground mb-2">
                  Why it matters
                </h3>
                <p className="text-muted-foreground mb-8">{service.why}</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="cyber" asChild>
                    <Link to="/contact">Book a Security Consultation</Link>
                  </Button>
                  {service.href && (
                    <Button variant="cyberOutline" asChild>
                      <Link to={service.href}>Explore in detail</Link>
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-display text-base font-semibold mb-4">Key services</h3>
                  <ul className="space-y-2.5">
                    {service.keyServices.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-display text-base font-semibold mb-4">Business outcomes</h3>
                  <ul className="space-y-2.5">
                    {service.outcomes.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <FinalCTA />
    </>
  );
};

export default Services;