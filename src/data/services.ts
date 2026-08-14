import {
  Compass,
  ShieldAlert,
  Laptop,
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
      "Security strategy, architecture advisory, maturity and risk assessments, CISO advisory, board-level reporting, and security backlog reduction.",
    what: "A structured view of where your security program stands today and a practical roadmap for where it should go next.",
    why: "Security investment only pays off when it is aligned with business objectives, risk tolerance, and the resources available to operate it.",
    keyServices: [
      "Cybersecurity strategy and roadmaps",
      "Security architecture advisory",
      "Security technology evaluation",
      "Cybersecurity maturity and risk assessments",
      "Security program and operating model improvement",
      "CISO advisory and fractional CISO services",
      "Executive and board-level risk reporting",
      "Security backlog and cyber risk prioritization",
      "Regulated industry and financial services advisory",
    ],
    outcomes: [
      "A clear, prioritized security roadmap",
      "Security decisions tied to business risk",
      "Confident conversations with leadership and the board",
    ],
  },
  {
    slug: "vulnerability-risk-management",
    number: "02",
    title: "Vulnerability & Risk Management",
    shortTitle: "Vulnerability & Risk Management",
    icon: ShieldAlert,
    summary:
      "Build and operate a risk-based vulnerability management program — from discovery and prioritization through remediation, compliance, and executive reporting.",
    what: "A repeatable, end-to-end process for finding weaknesses across your environment and driving the ones that carry real business risk to closure.",
    why: "Most organizations have more vulnerabilities than capacity to remediate. Risk-based prioritization is what turns scanning into measurable risk reduction.",
    keyServices: [
      "Vulnerability management program design and ownership",
      "Asset and vulnerability discovery",
      "Vulnerability and compliance scanning",
      "Risk-based prioritization (CVSS, EPSS, CISA KEV, business impact)",
      "Remediation planning and cross-team coordination",
      "Remediation tracking, rescanning, and validation",
      "Risk exceptions and risk acceptance",
      "CISO and board vulnerability reporting",
    ],
    outcomes: [
      "Measurable reduction in exposure",
      "Remediation effort focused where it matters most",
      "Executive reporting leadership can act on",
    ],
    href: "/services/vulnerability-management",
  },
  {
    slug: "endpoint-security-edr-xdr",
    number: "03",
    title: "Endpoint Security, EDR & XDR",
    shortTitle: "Endpoint Security",
    icon: Laptop,
    summary:
      "Deploy, migrate, manage, and optimize enterprise endpoint security platforms while maintaining coverage, compliance, and operational resilience.",
    what: "Full lifecycle management of enterprise EDR/XDR platforms — from architecture and rollout through day-to-day operations and audit readiness.",
    why: "Endpoint platforms only deliver value when they are configured correctly, tuned continuously, and provable to auditors and leadership.",
    keyServices: [
      "EDR/XDR strategy, architecture, and deployment",
      "Sensor rollout, upgrades, and troubleshooting",
      "EDR platform migration and coexistence planning",
      "Audit evidence collection and compliance support",
      "Container, Kubernetes, and workload visibility",
      "Mobile endpoint security (MDM/MTD)",
      "Feature testing and controlled rollout",
    ],
    outcomes: [
      "Consistent endpoint coverage across your fleet",
      "Smoother platform migrations with minimal coverage gaps",
      "Audit-ready evidence without a scramble",
    ],
    href: "/services/endpoint-security",
  },
  {
    slug: "cloud-infrastructure-security",
    number: "04",
    title: "Cloud & Infrastructure Security",
    shortTitle: "Cloud Security",
    icon: Cloud,
    summary:
      "Cloud vulnerability detection and remediation, workload and container security, posture management, and continuous cloud risk monitoring.",
    what: "Security review, prioritization, and hardening of the cloud platforms, workloads, containers, and infrastructure your business runs on.",
    why: "Cloud environments change constantly, and misconfiguration, unpatched workloads, and over-permissioned identities remain leading causes of incidents.",
    keyServices: [
      "Cloud vulnerability and posture assessments",
      "Cloud workload and configuration scanning",
      "Container, Kubernetes, and runtime security",
      "Infrastructure-as-Code and CI/CD security",
      "Software dependency and supply-chain scanning",
      "Risk-based prioritization and remediation tracking",
      "Continuous monitoring and compliance reporting",
    ],
    outcomes: [
      "Fewer misconfigurations and excessive permissions",
      "Consistent security across cloud platforms and workloads",
      "Cloud adoption that does not outpace security",
    ],
    href: "/services/cloud-security",
  },
  {
    slug: "governance-risk-compliance",
    number: "05",
    title: "Governance, Risk & Compliance",
    shortTitle: "GRC",
    icon: ScrollText,
    summary:
      "Security policies and procedures, access reviews and attestation, security documentation, and audit and compliance readiness.",
    what: "The policies, controls, access reviews, and evidence that demonstrate your organization manages cyber risk responsibly.",
    why: "Customers, insurers, and regulators increasingly ask for proof. Maintaining readiness continuously avoids rushed, expensive remediation later.",
    keyServices: [
      "Security policy and procedure development",
      "Policy lifecycle management and regulatory alignment",
      "User, privileged, and critical system access reviews",
      "Access attestation and compliance reporting",
      "Security documentation and knowledge-base management",
      "NIST CSF, ISO 27001, SOC 2, and PCI DSS alignment",
      "Audit and assessment readiness",
    ],
    outcomes: [
      "Documented, defensible security governance",
      "Faster responses to customer and regulator security reviews",
      "A clear path to certification or attestation",
    ],
    href: "/services/governance-risk-compliance",
  },
  {
    slug: "incident-response-threat-readiness",
    number: "06",
    title: "Incident Response & Threat Readiness",
    shortTitle: "Incident Response",
    icon: Siren,
    summary:
      "Complex incident investigation, threat hunting, incident response planning, tabletop exercises, and post-incident control improvement.",
    what: "Preparation, investigation, and response support so your team knows exactly what to do when something goes wrong — before, during, and after it does.",
    why: "The difference between a contained event and a business disruption is usually preparation and investigation quality, not technology alone.",
    keyServices: [
      "Incident response plans and playbooks",
      "Tabletop exercises and ransomware readiness",
      "Phishing, malware, and ransomware investigations",
      "Business email compromise and account takeover investigations",
      "Threat hunting and lateral movement analysis",
      "Containment, eradication, and recovery support",
      "Post-incident lessons learned and control improvement",
    ],
    outcomes: [
      "Faster, calmer response under pressure",
      "Clear scope, root cause, and impact after an incident",
      "Stronger controls that reduce recurrence",
    ],
    href: "/services/incident-response",
  },
  {
    slug: "ai-security-governance",
    number: "07",
    title: "AI Security & Governance",
    shortTitle: "AI Security",
    icon: BrainCircuit,
    summary:
      "AI application discovery, shadow AI identification, AI vendor risk assessment, generative AI and LLM security, and AI governance.",
    what: "Security and governance for the AI systems, assistants, agents, and vendors your organization is adopting — sanctioned and unsanctioned.",
    why: "AI introduces new exposure paths — sensitive data in prompts, unmanaged tools adopted outside of IT, and vendors with unclear data handling.",
    keyServices: [
      "AI application and shadow AI discovery",
      "AI vendor and data-exposure risk assessment",
      "Generative AI, LLM, and RAG security",
      "AI agent and tool permission review",
      "AI governance frameworks and adoption guardrails",
      "AI supply-chain and data residency assessment",
    ],
    outcomes: [
      "Visibility into AI use across the organization",
      "AI adoption without uncontrolled data exposure",
      "Governance that keeps pace with usage",
    ],
    href: "/services/ai-security",
  },
  {
    slug: "cybersecurity-training",
    number: "08",
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
