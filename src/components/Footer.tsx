import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";

const pageLinks = [
  { name: "Home", to: "/" },
  { name: "Services", to: "/services" },
  { name: "About", to: "/about" },
  { name: "Why SecureBit", to: "/why-securebit" },
  { name: "Contact", to: "/contact" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-display font-bold text-lg">SecureBit</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Security Re-engineered. Risk Managed. Business Enabled.
            </p>
          </div>

          <nav aria-label="Footer pages">
            <h2 className="font-display text-sm font-semibold mb-4">Navigation</h2>
            <ul className="space-y-2 text-sm">
              {pageLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.to} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer services">
            <h2 className="font-display text-sm font-semibold mb-4">Services</h2>
            <ul className="space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={service.href ?? `/services#${service.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-semibold mb-4">Get started</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Tell us about your cybersecurity challenge and we will help you find the right next step.
            </p>
            <Button variant="cyber" asChild>
              <Link to="/contact">Book a Security Consultation</Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-sm text-muted-foreground">
          © {new Date().getFullYear()} SecureBit. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
