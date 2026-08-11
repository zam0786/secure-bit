import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Shield, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/data/services";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Why SecureBit", to: "/why-securebit" },
  { name: "Contact", to: "/contact" },
];

const serviceLinks = services.map((s) => ({
  name: s.title,
  to: s.href ?? `/services#${s.slug}`,
}));

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border">
      <nav aria-label="Main" className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2" aria-label="SecureBit home">
            <Shield className="w-7 h-7 text-primary" />
            <span className="font-display font-bold text-xl text-foreground">SecureBit</span>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            <NavLink
              to="/"
              end
              className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm"
              activeClassName="text-primary"
            >
              Home
            </NavLink>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors font-medium text-sm data-[state=open]:text-primary">
                Services
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80">
                <DropdownMenuItem asChild>
                  <Link to="/services" className="font-medium">
                    All Services
                  </Link>
                </DropdownMenuItem>
                {serviceLinks.map((link) => (
                  <DropdownMenuItem key={link.name} asChild>
                    <Link to={link.to}>{link.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.slice(1).map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm"
                activeClassName="text-primary"
              >
                {link.name}
              </NavLink>
            ))}

            <Button variant="cyber" size="sm" asChild>
              <Link to="/contact">Book a Security Consultation</Link>
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden text-foreground p-2 -mr-2"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1 max-h-[70dvh] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="text-foreground hover:text-primary transition-colors py-2.5 min-h-11 flex items-center"
                >
                  {link.name}
                </Link>
              ))}
              <p className="pt-3 pb-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Services
              </p>
              <Link
                to="/services"
                className="text-foreground hover:text-primary transition-colors py-2.5 min-h-11 flex items-center"
              >
                All Services
              </Link>
              {serviceLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="text-muted-foreground hover:text-primary transition-colors py-2.5 min-h-11 flex items-center text-sm"
                >
                  {link.name}
                </Link>
              ))}
              <Button variant="cyber" className="w-full mt-4" asChild>
                <Link to="/contact">Book a Security Consultation</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
