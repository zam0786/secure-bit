import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/home/FinalCTA";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const lifecycle = ["Detect", "Investigate", "Contain", "Eradicate", "Recover", "Learn", "Strengthen"];

const investigationTypes = [
  "Phishing investigations",
  "Ransomware investigations",
  "Malware investigations",
  "Advanced persistence investigations",
  "Account compromise and credential theft",
  "SIM swapping attacks",
  "Smishing",
  "Business email compromise",
  "Endpoint compromise",
  "Suspicious authentication activity",
  "Lateral movement investigation",
  "Threat hunting and root-cause analysis",
];

const advancedThreat = [
  "Persistence mechanisms",
  "Malware behavior",
  "Endpoint telemetry",
  "Authentication activity",
  "Lateral movement",
  "Command-and-control indicators",
  "Compromised accounts",
  "Suspicious processes",
  "Network activity",
  "Threat intelligence correlation",
  "Timeline reconstruction",
];

const IncidentResponse = () => {
  return (
    <>
      <Seo
        title="Incident Response & Threat Readiness | SecureBit"
        description="SecureBit helps organizations investigate complex security incidents, contain threats, recover operations, and strengthen controls to reduce recurrence."
        path="/services/incident-response"
      />
      <PageHero
        eyebrow="Incident Response & Threat Readiness"
        title="Investigate, Contain, and Recover With Confidence"
        text="When a security incident becomes complex, SecureBit helps organizations understand what happened, determine the scope and root cause, contain the threat, recover operations, and strengthen controls to reduce recurrence."
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
          <div className="max-w-2xl mb-12">
            <h2 className="font-display text-3xl font-bold mb-5">
              Complex incident investigation & response
            </h2>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {investigationTypes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground"
              >
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 border-b border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="font-display text-3xl font-bold mb-5">Advanced threat investigation</h2>
            <p className="text-muted-foreground text-lg">
              Evidence-driven investigation to understand attacker activity, scope, impact, and
              root cause.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {advancedThreat.map((item) => (
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

      <FinalCTA
        heading="In the middle of an incident — or preparing for one?"
        text="We can help you investigate, contain, and recover, or build the readiness and playbooks so your team is prepared before something happens."
      />
    </>
  );
};

export default IncidentResponse;
