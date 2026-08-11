import {
  Compass,
  ShieldAlert,
  Cloud,
  ScrollText,
  Siren,
  BrainCircuit,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

export interface ServiceDetail {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  summary: string;
  what: string;
  why: string;
  keyServices: string[];
  outcomes: string[];
  href?: string;
}

export const services: ServiceDetail[] = [
  {
    slug: "cybersecurity-strategy-advisory",
    number: "01",
    title: "Cybersecurity Strategy & Advisory",
    shortTitle: "Cybersecurity Advisory",
    icon: Compass,
    summary:
      "Security assessments, cybersecurity roadmaps, maturity assessments, security architecture reviews, cyber risk assessments, executive advisory, and Fractional CISO services.",
    what: "A structured view of where your security program stands today and a practical roadmap for where it should go next.",
    why: "Security investment only pays off when it is aligned with business objectives, risk tolerance, and the resources available to operate it.",
    keyServices: [
      "Security program assessments",
      "Cybersecurity strategy and roadmaps",
      "Security maturity assessments",
      "Security architecture reviews",
      "Cyber risk assessments",
      "Executive and board advisory",
      "Fractional CISO services",
    ],
    outcomes: [
      "A clear, prioritized security roadmap",
      "Security decisions tied to business risk",
      "Confident conversations with leadership",
    ],
  },
  {
    slug: "vulnerability-risk-management",
    number: "02",
    title: "Vulnerability & Risk Management",
    shortTitle: "Vulnerability & Risk Management",
    icon: ShieldAlert,
    summary:
      "Vulnerability assessments, vulnerability management, attack surface assessments, risk-based prioritization, remediation strategy, and executive reporting.",
    what: "A repeatable process for finding weaknesses across your environment and fixing the ones that carry real business risk first.",
    why: "Most organizations have more vulnerabilities than capacity to remediate. Prioritization is what turns scanning into risk reduction.",
    keyServices: [
      "Vulnerability assessments",
      "Ongoing vulnerability management",
      "External attack surface assessments",
      "Risk-based prioritization",
      "Remediation strategy and planning",
      "Executive and operational reporting",
    ],
    outcomes: [
      "Measurable reduction in exposure",
      "Remediation effort focused where it matters",
      "Reporting leadership can act on",
    ],
  },
  {
    slug: "cloud-infrastructure-security",
    number: "03",
    title: "Cloud & Infrastructure Security",
    shortTitle: "Cloud Security",
    icon: Cloud,
    summary:
      "Azure, AWS, GCP, CSPM/CNAPP, cloud architecture, identity, containers, Kubernetes, and infrastructure security.",
    what: "Security review and hardening of the cloud platforms, identities, workloads, and infrastructure your business runs on.",
    why: "Cloud environments change constantly, and misconfiguration and over-permissioned identities remain among the most common causes of incidents.",
    keyServices: [
      "Azure, AWS, and GCP security reviews",
      "CSPM and CNAPP implementation",
      "Secure cloud architecture design",
      "Identity and access management",
      "Container and Kubernetes security",
      "Network and infrastructure hardening",
    ],
    outcomes: [
      "Fewer misconfigurations and excessive permissions",
      "Consistent security across cloud platforms",
      "Cloud adoption that does not outpace security",
    ],
  },
  {
    slug: "governance-risk-compliance",
    number: "04",
    title: "Governance, Risk & Compliance",
    shortTitle: "GRC",
    icon: ScrollText,
    summary:
      "NIST, ISO 27001 readiness, CIS Controls, SOC 2 readiness, security policies, risk management, third-party risk, and audit readiness.",
    what: "The policies, controls, and evidence that demonstrate your organization manages cyber risk responsibly.",
    why: "Customers, insurers, and regulators increasingly ask for proof. Preparing early avoids rushed, expensive remediation later.",
    keyServices: [
      "NIST CSF and CIS Controls alignment",
      "ISO 27001 readiness",
      "SOC 2 readiness",
      "Security policy and standard development",
      "Risk management programs",
      "Third-party and vendor risk",
      "Audit and assessment readiness",
    ],
    outcomes: [
      "Documented, defensible security governance",
      "Faster responses to customer security reviews",
      "A clear path to certification or attestation",
    ],
  },
  {
    slug: "incident-response-threat-readiness",
    number: "05",
    title: "Incident Response & Threat Readiness",
    shortTitle: "Incident Response",
    icon: Siren,
    summary:
      "Incident response planning, tabletop exercises, ransomware readiness, threat hunting, detection engineering, and security control validation.",
    what: "Preparation and practice so your team knows exactly what to do when something goes wrong — before it does.",
    why: "The difference between a contained event and a business disruption is usually preparation, not technology.",
    keyServices: [
      "Incident response plans and playbooks",
      "Tabletop exercises",
      "Ransomware readiness assessments",
      "Threat hunting",
      "Detection engineering",
      "Security control validation",
    ],
    outcomes: [
      "Faster, calmer response under pressure",
      "Detection gaps identified before an incident",
      "Clear roles, escalation, and communication",
    ],
  },
  {
    slug: "ai-security-governance",
    number: "06",
    title: "AI Security & Governance",
    shortTitle: "AI Security",
    icon: BrainCircuit,
    summary:
      "Generative AI security, LLM security, AI risk assessments, RAG security, AI agent security, AI governance, data protection, and secure AI adoption.",
    what: "Security and governance for the AI systems, assistants, and agents your organization is adopting.",
    why: "AI introduces new exposure paths — sensitive data in prompts, over-permissioned agents, and tooling adopted outside of IT.",
    keyServices: [
      "AI security assessments",
      "Generative AI and LLM security",
      "RAG and knowledge base security",
      "AI agent and tool permission review",
      "AI governance frameworks",
      "AI data protection and privacy",
      "Secure AI adoption guidance",
    ],
    outcomes: [
      "AI adoption without uncontrolled data exposure",
      "Governance that keeps pace with usage",
      "Clear guardrails for teams building with AI",
    ],
    href: "/services/ai-security",
  },
  {
    slug: "cybersecurity-training",
    number: "07",
    title: "Cybersecurity Training",
    shortTitle: "Training",
    icon: GraduationCap,
    summary:
      "Role-based security awareness, phishing awareness, executive briefings, technical workshops, security leadership development, and CISSP preparation.",
    what: "Practical, role-based training that builds security capability across your organization.",
    why: "Technology alone cannot eliminate cyber risk. People make the decisions that determine whether controls hold.",
    keyServices: [
      "Cybersecurity awareness training",
      "Phishing awareness",
      "Executive cybersecurity training",
      "Technical security workshops",
      "Security leadership training",
      "AI security training",
      "CISSP preparation",
      "Customized cybersecurity workshops",
    ],
    outcomes: [
      "Employees who recognize and report risk",
      "Technical teams with sharper security skills",
      "Leaders who can make informed security decisions",
    ],
    href: "/services/training",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);