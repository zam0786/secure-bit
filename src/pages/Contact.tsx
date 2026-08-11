import Seo from "@/components/Seo";
import ContactForm from "@/components/ContactForm";
import { Mail, Clock, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <>
      <Seo
        title="Contact SecureBit | Cybersecurity Consultation"
        description="Contact SecureBit to discuss a cybersecurity assessment, vulnerability management, cloud security, compliance, incident response, AI security, or Fractional CISO support."
        path="/contact"
      />

      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 bg-cyber-grid opacity-[0.1]" aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-start">
            <div>
              <p className="eyebrow mb-4">Contact</p>
              <h1 className="font-display text-3xl md:text-5xl font-bold mb-6">
                Let's Talk About Your Security
              </h1>
              <p className="text-lg text-muted-foreground mb-10">
                Tell us about your cybersecurity challenge, and we'll help you determine the right
                next step.
              </p>

              <dl className="space-y-5">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-primary mt-1" aria-hidden="true" />
                  <div>
                    <dt className="text-sm text-muted-foreground">Email</dt>
                    <dd className="font-medium">
                      <a href="mailto:info@securebit.ca" className="hover:text-primary transition-colors">
                        info@securebit.ca
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-primary mt-1" aria-hidden="true" />
                  <div>
                    <dt className="text-sm text-muted-foreground">Response time</dt>
                    <dd className="font-medium">Within one business day</dd>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary mt-1" aria-hidden="true" />
                  <div>
                    <dt className="text-sm text-muted-foreground">Serving</dt>
                    <dd className="font-medium">Canadian and North American organizations</dd>
                  </div>
                </div>
              </dl>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;