import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "Business-Focused Security",
    text: "Cybersecurity should support business objectives rather than become an obstacle to them. We frame security work in terms of what the business is trying to achieve.",
  },
  {
    title: "Practical Recommendations",
    text: "We focus on solutions organizations can realistically implement and maintain, with the people and tooling they already have.",
  },
  {
    title: "Risk-Based Prioritization",
    text: "Not every vulnerability represents the same level of business risk. We help you sequence remediation so the most meaningful exposure is addressed first.",
  },
  {
    title: "Enterprise Experience",
    text: "Apply mature cybersecurity practices without unnecessary complexity — the discipline of a large security program, sized to your organization.",
  },
  {
    title: "Partnership",
    text: "We work alongside your organization to improve security over time, rather than delivering a report and moving on.",
  },
];

const WhySecureBit = () => {
  return (
    <>
      <Seo
        title="Why SecureBit | Practical Cybersecurity Expertise"
        description="Why organizations choose SecureBit: business-focused security, risk-based prioritization, practical recommendations, enterprise experience, and long-term partnership."
        path="/why-securebit"
      />
      <PageHero
        eyebrow="Why SecureBit"
        title="Cybersecurity With Purpose"
        text="We help organizations move from security uncertainty to clear priorities, practical action, and measurable improvement."
      />

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            {sections.map((section, i) => (
              <article
                key={section.title}
                className={`surface-card ${i === sections.length - 1 ? "md:col-span-2" : ""}`}
              >
                <h2 className="font-display text-xl font-semibold mb-3">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-14">
            <Button variant="cyber" size="lg" asChild>
              <Link to="/contact">Talk to SecureBit</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhySecureBit;