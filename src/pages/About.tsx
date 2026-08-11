import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/home/FinalCTA";
import { Button } from "@/components/ui/button";
import { Eye, Target, Search, Scale, CheckCircle2 } from "lucide-react";

const principles = [
  {
    icon: Search,
    title: "Understand the Business",
    text: "We start with your objectives, technology, and constraints — not a generic checklist.",
  },
  {
    icon: Scale,
    title: "Focus on Risk",
    text: "We concentrate attention and budget on the exposure that would genuinely affect the business.",
  },
  {
    icon: CheckCircle2,
    title: "Deliver Practical Outcomes",
    text: "Every recommendation is something your organization can realistically implement and maintain.",
  },
];

const About = () => {
  return (
    <>
      <Seo
        title="About SecureBit | Cybersecurity & Risk Advisory"
        description="SecureBit is a cybersecurity advisory firm helping organizations identify and reduce cyber risk through practical, business-focused security solutions."
        path="/about"
      />
      <PageHero
        eyebrow="About"
        title="Cybersecurity Expertise With a Business Perspective"
        text="SecureBit helps organizations identify and reduce cyber risk through practical, business-focused cybersecurity solutions."
      >
        <Button variant="cyber" asChild>
          <Link to="/contact">Book a Security Consultation</Link>
        </Button>
      </PageHero>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <article className="rounded-xl border border-border bg-card p-8">
              <Eye className="w-6 h-6 text-primary mb-5" aria-hidden="true" />
              <h2 className="font-display text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-muted-foreground mb-4">
                To help businesses stay secure, resilient, and confident in a constantly changing
                digital world.
              </p>
              <p className="text-muted-foreground mb-4">
                SecureBit provides practical cybersecurity solutions that help organizations manage
                risk, protect critical systems and data, meet security requirements, and prepare for
                evolving cyber threats.
              </p>
              <p className="text-foreground font-medium">
                Protect what matters. Reduce risk. Grow with confidence.
              </p>
            </article>

            <article className="rounded-xl border border-border bg-card p-8">
              <Target className="w-6 h-6 text-primary mb-5" aria-hidden="true" />
              <h2 className="font-display text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                Our mission is to simplify cybersecurity and turn risk into resilience.
              </p>
              <p className="text-muted-foreground">
                We provide practical, business-focused security solutions that protect critical
                systems and data, strengthen security maturity, and help organizations confidently
                navigate an evolving threat landscape.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-14">
            <p className="eyebrow mb-4">Our approach</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-5">
              Security Built Around Your Business
            </h2>
            <p className="text-muted-foreground text-lg">
              Every organization has different technology, priorities, resources, and risk tolerance.
              SecureBit works collaboratively with clients to understand those differences and
              develop practical security solutions that fit their environment.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {principles.map((principle) => (
              <article key={principle.title} className="surface-card">
                <principle.icon className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold mb-2">{principle.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
};

export default About;