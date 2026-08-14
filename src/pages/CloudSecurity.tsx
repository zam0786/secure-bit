import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/home/FinalCTA";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const lifecycle = ["Discover", "Assess", "Prioritize", "Remediate", "Validate", "Monitor"];

const capabilities = [
  { title: "Cloud Vulnerability Assessments", text: "Identify vulnerabilities across cloud workloads and services." },
  { title: "Cloud Security Posture", text: "Assess configuration and posture against security baselines." },
  { title: "Workload Vulnerability Scanning", text: "Scan cloud workloads on an ongoing basis, not just point-in-time." },
  { title: "Misconfiguration Assessment", text: "Find and prioritize risky configurations before they're exploited." },
  { title: "Container & Kubernetes Security", text: "Secure container images, orchestration, and runtime environments." },
  { title: "Infrastructure-as-Code Security", text: "Catch risk in Terraform, CloudFormation, and similar templates before deploy." },
  { title: "CI/CD Security", text: "Build security checks into your delivery pipeline." },
  { title: "Application & Dependency Vulnerabilities", text: "Identify vulnerable and outdated dependencies in your software supply chain." },
  { title: "Remediation Action Plans", text: "Turn findings into coordinated, actionable remediation plans." },
  { title: "Developer & Infrastructure Coordination", text: "Work directly with development and infrastructure teams to close findings." },
  { title: "Remediation Tracking & Rescanning", text: "Track fixes through closure with validation and rescanning." },
  { title: "Continuous Monitoring", text: "Ongoing visibility into cloud workload and configuration risk, not a one-time scan." },
];

const devSecurityItems = [
  "Open-source dependency vulnerabilities",
  "Software composition analysis",
  "Container image vulnerabilities",
  "Infrastructure-as-Code security",
  "Kubernetes security",
  "CI/CD security integration",
  "Cloud workload vulnerabilities",
  "Developer remediation guidance",
];

const complianceItems = [
  "Compliance scanning",
  "Security control validation",
  "Audit evidence",
  "Remediation tracking",
  "Risk exceptions",
  "Continuous compliance monitoring",
];

const CloudSecurity = () => {
  return (
    <>
      <Seo
        title="Cloud & Infrastructure Security Services | SecureBit"
        description="SecureBit helps organizations detect cloud vulnerabilities and misconfigurations, secure containers and workloads, and continuously monitor cloud security posture."
        path="/services/cloud-security"
      />
      <PageHero
        eyebrow="Cloud & Infrastructure Security"
        title="Find, Prioritize, and Close Cloud Risk — Continuously"
        text="SecureBit helps organizations identify cloud vulnerabilities and misconfigurations, prioritize the risks that matter most, coordinate remediation, and continuously validate their cloud security posture."
      >
        <Button variant="cyber" asChild>
          <Link to="/contact">Book a Security Consultation</Link>
        </Button>
      </PageHero>

      <section className="py-16 border-b border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {lifecycle.map((step, i) => (
              <div key={step} className="flex items-center gap-3 md:gap-4">
                <span className="rounded-full border border-primary/40 bg-card px-4 py-2 text-sm font-medium text-foreground">
                  {step}
                </span>
                {i < lifecycle.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold mb-12 max-w-2xl">
            Cloud vulnerability detection & remediation
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((item) => (
              <article key={item.title} className="surface-card">
                <Check className="w-5 h-5 text-primary mb-4" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-3xl font-bold mb-5">Developer & cloud security</h2>
            <p className="text-muted-foreground text-lg">
              Cloud vulnerability management works best as collaboration, not a hand-off — security
              findings that route directly to the teams who can act on them.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-10">
            {["Security", "Cloud", "Infrastructure", "Development"].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-3 md:gap-4">
                <span className="rounded-full border border-primary/40 bg-card px-4 py-2 text-sm font-medium text-foreground">
                  {step}
                </span>
                {i < arr.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {devSecurityItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-lg border border-border bg-card p-4 text-sm"
              >
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-8">
            <h2 className="font-display text-xl font-semibold mb-3">Cloud compliance</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cloud vulnerability management connects directly to your compliance program, not a
              separate workstream.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl">
            {complianceItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-sm rounded-lg border border-border bg-card px-4 py-3"
              >
                <Check className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 border-b border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="font-display text-xl font-semibold mb-3">Technology experience</h2>
            <p className="text-muted-foreground leading-relaxed">
              Experience working with Prisma Cloud, Snyk, and other cloud-native security
              platforms. Referenced as technology experience — not as official vendor
              partnerships unless explicitly stated.
            </p>
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Not sure what's exposed in your cloud environment?"
        text="We can run a cloud vulnerability and posture assessment, prioritize findings by real risk, and help you build a remediation plan your teams can execute."
      />
    </>
  );
};

export default CloudSecurity;
