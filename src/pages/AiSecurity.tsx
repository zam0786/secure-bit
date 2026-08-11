import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/home/FinalCTA";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Check } from "lucide-react";

const capabilities = [
  { title: "AI Security Assessments", text: "Review how AI is used across your organization and where it introduces risk." },
  { title: "Generative AI Security", text: "Secure assistants and copilots handling business and customer information." },
  { title: "LLM Security", text: "Address prompt injection, output handling, and model integration weaknesses." },
  { title: "RAG Security", text: "Protect retrieval pipelines and the knowledge sources they expose." },
  { title: "AI Agent Security", text: "Scope agent permissions, tools, and actions to the minimum required." },
  { title: "AI Governance", text: "Define approval, oversight, and accountability for AI use." },
  { title: "AI Risk Management", text: "Bring AI risk into your existing risk management process." },
  { title: "AI Data Protection", text: "Control what data reaches models, logs, and third parties." },
  { title: "Secure AI Adoption", text: "Practical guardrails so teams can build with AI safely." },
];

const risks = [
  "Prompt injection",
  "Sensitive data exposure",
  "Model misuse",
  "Insecure AI integrations",
  "Excessive agent permissions",
  "Shadow AI",
  "Data leakage",
  "AI supply-chain risks",
];

const AiSecurity = () => {
  return (
    <>
      <Seo
        title="AI Security & Governance | SecureBit"
        description="SecureBit helps organizations adopt AI responsibly with AI security assessments, LLM and RAG security, AI agent security, AI governance, and data protection."
        path="/services/ai-security"
      />
      <PageHero
        eyebrow="AI Security"
        title="Secure AI. Accelerate Innovation."
        text="AI is transforming how organizations work, but it also introduces new security, privacy, governance, and data protection challenges. SecureBit helps organizations adopt AI responsibly while managing emerging risks."
      >
        <Button variant="cyber" asChild>
          <Link to="/contact">Book a Security Consultation</Link>
        </Button>
      </PageHero>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold mb-12 max-w-2xl">
            How SecureBit supports secure AI adoption
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
          <div className="max-w-3xl mb-12">
            <h2 className="font-display text-3xl font-bold mb-5">AI security risks we help address</h2>
            <p className="text-muted-foreground text-lg">
              AI systems expand the attack surface in ways traditional controls were not designed
              for. These are the risks we most often help organizations understand and mitigate.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {risks.map((risk) => (
              <li
                key={risk}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-sm"
              >
                <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-foreground">{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA
        heading="Planning an AI rollout?"
        text="We can review your AI use cases, integrations, and data flows, then help you put practical guardrails and governance in place before risk accumulates."
      />
    </>
  );
};

export default AiSecurity;