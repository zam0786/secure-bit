import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/home/FinalCTA";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";

const tabGroups = [
  {
    value: "lifecycle",
    label: "EDR Lifecycle",
    heading: "EDR / XDR lifecycle management",
    items: [
      "Strategy and architecture",
      "Deployment and configuration",
      "Pilot testing and enterprise rollout",
      "Sensor/agent deployment and upgrades",
      "Troubleshooting and operational management",
      "Feature testing and controlled deployment",
      "Optimization and platform retirement",
    ],
  },
  {
    value: "migration",
    label: "Migration",
    heading: "EDR platform migration",
    items: [
      "Current-state assessment",
      "EDR platform evaluation",
      "Migration strategy and coexistence planning",
      "Pilot deployment",
      "Enterprise deployment",
      "Security coverage validation",
      "Rollback planning",
      "Legacy EDR decommissioning",
      "Post-migration validation",
    ],
  },
  {
    value: "audit",
    label: "Audit & Compliance",
    heading: "EDR audit, compliance & assurance",
    items: [
      "Preparing EDR artifacts for internal and external auditors",
      "Responding to auditor questions",
      "Evidence collection and configuration/policy evidence",
      "Demonstrating EDR coverage",
      "Audit finding remediation and corrective action plans",
      "Tracking findings through closure",
      "Continuous audit readiness and executive reporting",
    ],
  },
  {
    value: "container",
    label: "Container & Workload",
    heading: "Container & workload security",
    items: [
      "Container, Kubernetes, and container image security",
      "Runtime security and cloud workload security",
      "Workload visibility",
      "Supported security agent and telemetry deployment",
      "Security policy validation and troubleshooting",
      "EDR/XDR integration with cloud and workload environments",
    ],
  },
  {
    value: "mobile",
    label: "Mobile Security",
    heading: "Mobile endpoint security",
    items: [
      "Deployment and management (e.g. Lookout)",
      "Device onboarding",
      "Security posture monitoring and mobile threat detection",
      "BYOD risk management",
      "Mobile application security and data protection",
      "Troubleshooting and operational management",
    ],
  },
];

const EndpointSecurity = () => {
  return (
    <>
      <Seo
        title="Endpoint Security, EDR & XDR Services | SecureBit"
        description="SecureBit helps organizations deploy, migrate, manage, and audit enterprise EDR/XDR platforms — including container, workload, and mobile endpoint security."
        path="/services/endpoint-security"
      />
      <PageHero
        eyebrow="Endpoint Security, EDR & XDR"
        title="Deploy, Manage, and Optimize Endpoint Security With Confidence"
        text="Deploy, migrate, manage, and optimize enterprise endpoint security platforms while maintaining security coverage, compliance, and operational resilience."
      >
        <Button variant="cyber" asChild>
          <Link to="/contact">Book a Security Consultation</Link>
        </Button>
      </PageHero>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="lifecycle" className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0 mb-10">
              {tabGroups.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-full border border-border bg-secondary/60 px-4 py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabGroups.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="mt-0">
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">{tab.heading}</h2>
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tab.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="py-16 border-b border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="font-display text-xl font-semibold mb-3">Technology experience</h2>
            <p className="text-muted-foreground leading-relaxed">
              Hands-on experience across CrowdStrike, FireEye HX, and Lookout, spanning Windows,
              Linux, macOS, cloud, and container/Kubernetes endpoints. Referenced as technology
              experience — not as official vendor partnerships.
            </p>
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Migrating or scaling your EDR platform?"
        text="We can assess your current endpoint coverage, plan a migration or rollout, and get you audit-ready evidence along the way."
      />
    </>
  );
};

export default EndpointSecurity;
