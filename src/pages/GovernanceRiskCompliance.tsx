import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/home/FinalCTA";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, ArrowRight } from "lucide-react";

const policyLifecycle = ["Develop", "Approve", "Implement", "Review", "Update"];

const sections = [
  {
    value: "policies",
    title: "Security Policies & Procedures",
    intro:
      "SecureBit helps organizations build and maintain practical security policies and procedures that remain aligned with business, technology, and compliance requirements.",
    items: [
      "Security policy development and procedure development",
      "Policy lifecycle management and periodic reviews",
      "Security standards and guidelines",
      "Policy gap assessments and regulatory alignment",
      "Control mapping and policy approval workflows",
      "Version control",
    ],
  },
  {
    value: "access",
    title: "Access Reviews & Attestation",
    intro:
      "SecureBit helps organizations validate access to critical systems and sensitive information, support compliance attestations, and reduce excessive or inappropriate access.",
    items: [
      "User, privileged, and application access reviews",
      "Critical systems and applications access reviews",
      "Periodic access certification and attestation",
      "Identification of inappropriate or excessive access",
      "Evidence collection and compliance reporting",
      "Remediation tracking and audit support",
    ],
  },
  {
    value: "documentation",
    title: "Security Documentation & Knowledge Management",
    intro:
      "SecureBit helps organizations turn fragmented and outdated security documentation into structured, maintainable, and audit-ready security knowledge.",
    items: [
      "Security documentation cleanup (e.g. Confluence)",
      "Security knowledge-base organization",
      "Documentation lifecycle management and standardization",
      "Operational runbooks and audit documentation",
      "Evidence organization and documentation ownership",
      "Review processes to keep documentation audit-ready",
    ],
  },
];

const GovernanceRiskCompliance = () => {
  return (
    <>
      <Seo
        title="Governance, Risk & Compliance Services | SecureBit"
        description="SecureBit helps organizations build security policies, run access reviews and attestation, organize security documentation, and stay audit-ready across NIST, ISO 27001, SOC 2, and PCI DSS."
        path="/services/governance-risk-compliance"
      />
      <PageHero
        eyebrow="Governance, Risk & Compliance"
        title="Practical Policies, Clean Access, Audit-Ready Evidence"
        text="Build practical security policies, validate access to critical systems, organize your security documentation, and stay continuously audit-ready — not just before a review."
      >
        <Button variant="cyber" asChild>
          <Link to="/contact">Book a Security Consultation</Link>
        </Button>
      </PageHero>

      <section className="py-16 border-b border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {policyLifecycle.map((step, i) => (
              <div key={step} className="flex items-center gap-3 md:gap-4">
                <span className="rounded-full border border-primary/40 bg-card px-4 py-2 text-sm font-medium text-foreground">
                  {step}
                </span>
                {i < policyLifecycle.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <Accordion type="single" collapsible defaultValue="policies" className="w-full">
            {sections.map((section) => (
              <AccordionItem key={section.value} value={section.value} className="border-border">
                <AccordionTrigger className="font-display text-lg md:text-xl font-semibold hover:no-underline">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{section.intro}</p>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <FinalCTA
        heading="Preparing for an audit or customer security review?"
        text="We can help you tighten policies, clean up access, and organize documentation so you're ready before the request comes in."
      />
    </>
  );
};

export default GovernanceRiskCompliance;
