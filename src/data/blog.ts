export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: BlogBlock[];
  linkedinTeaser: string;
  disclosure?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "detecting-ransomware-over-smb-shares",
    category: "Use Case",
    title: "Detecting Ransomware Over SMB Shares: An EDR-Based Approach",
    excerpt:
      "Ransomware rarely announces itself on the endpoint that started it. It shows up first as a wave of file changes on a network share. Here's how to catch it there.",
    date: "2026-07-14",
    readTime: "6 min read",
    tags: ["Ransomware", "EDR", "File System Containment", "SMB"],
    linkedinTeaser:
      "Most ransomware detection strategies watch the wrong machine. The first sign of an attack is rarely on the endpoint that got compromised — it's the sudden spike in file writes on a shared drive three hops away. Wrote up the EDR-based approach we use to catch it there: 🔗 [link]",
    content: [
      {
        type: "paragraph",
        text: "When ransomware hits an organization, the first visible symptom is usually not on the compromised endpoint. It's on a file server or shared drive, where dozens of file extensions start changing in the space of a few minutes. By the time someone notices the share is unusable, the encryption has already spread across every mapped drive that endpoint could reach.",
      },
      {
        type: "paragraph",
        text: "That gap — between initial compromise and share-wide encryption — is where an EDR-based containment strategy earns its keep. The goal isn't just to detect ransomware; it's to detect the specific signature of mass file modification against SMB shares fast enough to sever the connection before the damage becomes irreversible.",
      },
      { type: "heading", text: "What we watch for" },
      {
        type: "list",
        items: [
          "Abnormally high-velocity file writes and renames against a single UNC path",
          "Sequential extension changes across many files in a short window",
          "A single host touching an unusual number of files across multiple shares",
          "Process lineage — is the writing process a known backup/sync tool, or something unrecognized spawning from a script or macro",
          "Correlation with recently modified or newly created scripts on the source endpoint",
        ],
      },
      {
        type: "heading",
        text: "Detection is only half the job",
      },
      {
        type: "paragraph",
        text: "Detecting the pattern matters far less than what happens in the next thirty seconds. A practical containment control needs to be able to automatically isolate the offending host's network access — or terminate its SMB session specifically — without waiting on an analyst to be at a keyboard. That means building and testing containment policies before an incident, not during one, and validating that the policy doesn't quietly break legitimate high-volume file operations like backup jobs or data migrations.",
      },
      {
        type: "quote",
        text: "The organizations that come through a ransomware event with a shrug, rather than a headline, are the ones who tested their containment policy against a false positive before they ever needed it against a real one.",
      },
      { type: "heading", text: "Where this tends to go wrong" },
      {
        type: "list",
        items: [
          "Containment thresholds tuned so loosely that real attacks slip under them",
          "Thresholds tuned so tightly that backup software trips them weekly, training the team to ignore alerts",
          "No tested rollback plan if containment fires on a legitimate business process",
          "Detection logic that only watches the endpoint, not the share — missing attacks that originate from an already-compromised machine outside your EDR's visibility",
        ],
      },
      {
        type: "paragraph",
        text: "None of this requires exotic tooling. It requires a clear-eyed view of what your EDR platform can actually see on network shares, a containment policy that's been pressure-tested against your own backup and sync traffic, and a runbook that tells the on-call analyst exactly what happens automatically versus what still needs a human decision.",
      },
    ],
  },
  {
    slug: "on-write-script-file-visibility",
    category: "Use Case",
    title: "On-Write Script File Visibility: Closing a Blind Spot in Endpoint Monitoring",
    excerpt:
      "Most endpoint policies watch what a script does when it runs. On-write visibility watches the moment it's written to disk — before it ever executes.",
    date: "2026-06-22",
    readTime: "7 min read",
    tags: ["EDR", "Script Visibility", "Detection Engineering", "Audit Evidence"],
    linkedinTeaser:
      "Execution-based detection has a blind spot: it only sees a malicious script after it runs. On-write visibility flips that — it watches the moment a script hits disk, before it ever executes. Broke down what a rollout of this control actually looks like, including the audit-evidence angle most teams skip: 🔗 [link]",
    content: [
      {
        type: "paragraph",
        text: "Most script-based detection is execution-based: a script runs, the EDR platform inspects the behavior, and a verdict gets made. That works well for known-bad behavior, but it means the earliest possible detection point — the moment the script file is actually written to disk — often goes completely unmonitored.",
      },
      {
        type: "paragraph",
        text: "On-write script file visibility closes that gap. Instead of waiting for execution, the control inspects script content as it's written — PowerShell, batch, VBS, and similar file types — and can flag or capture content regardless of whether the script ever runs. That's a meaningfully earlier detection point, and it catches staged payloads that an attacker drops and intends to trigger later, or through a separate mechanism entirely.",
      },
      { type: "heading", text: "Why it's worth the rollout effort" },
      {
        type: "list",
        items: [
          "Visibility into staged or dormant scripts before execution, not just after",
          "Coverage for living-off-the-land techniques that rely on legitimate interpreters",
          "A forensic record of script content even if the file is later deleted before execution",
          "Stronger audit evidence — you can demonstrate the control saw the file, not just that nothing bad happened to run",
        ],
      },
      { type: "heading", text: "What a real rollout has to account for" },
      {
        type: "paragraph",
        text: "This is not a control you flip on fleet-wide and walk away from. A few things matter more than the feature toggle itself:",
      },
      {
        type: "list",
        items: [
          "Performance impact on endpoints with high script-write volume — build/CI servers and automation hosts especially",
          "Data handling: where captured script content goes, how long it's retained, and who can access it, since scripts frequently contain credentials or internal paths",
          "Exclusions for legitimate high-frequency script generation (deployment tooling, config management agents) to avoid noise that drowns out real signal",
          "Data residency and subprocessor considerations if script content leaves your environment for cloud-based analysis",
          "A phased rollout — pilot group, monitor for false positives and performance regressions, then expand tier by tier rather than enterprise-wide on day one",
        ],
      },
      {
        type: "quote",
        text: "The control itself is straightforward. The certification-ready evidence package proving it's actually configured, tuned, and operating as intended across every tier of your environment is where most of the real work lives.",
      },
      {
        type: "paragraph",
        text: "For regulated environments, this control also tends to draw direct auditor interest — it's a clean, demonstrable answer to \"how would you detect a script-based attack before it runs?\" Building the evidence trail (policy configuration, exclusion rationale, tiered rollout status, data handling terms) alongside the technical rollout — rather than reconstructing it after the fact — is what turns a good control into a defensible one.",
      },
    ],
  },
  {
    slug: "auditing-endpoint-coverage-at-scale",
    category: "Use Case",
    title: "Auditing Endpoint Coverage at Scale: Lessons from a Multi-Subsidiary Sensor Upgrade",
    excerpt:
      "Upgrading EDR sensors across thousands of endpoints and multiple subsidiaries surfaces coverage gaps a single-environment rollout never would.",
    date: "2026-05-30",
    readTime: "6 min read",
    tags: ["EDR", "Sensor Management", "Audit Evidence", "Compliance"],
    linkedinTeaser:
      "Upgraded EDR sensors across 11,600+ endpoints spanning multiple subsidiaries and both RHEL 8 and 9. The technical upgrade was the easy part — proving coverage held at every stage for auditors was the real work. Notes from that process: 🔗 [link]",
    content: [
      {
        type: "paragraph",
        text: "A sensor version upgrade sounds like a routine maintenance task until it's happening across 11,600+ endpoints spanning multiple subsidiaries, mixed OS versions, and business units that each own their own change windows. At that scale, the technical upgrade path is rarely the hard part. Proving — continuously, not just at the end — that coverage held throughout is.",
      },
      { type: "heading", text: "What actually breaks at scale" },
      {
        type: "list",
        items: [
          "Endpoints that silently fail to check in for a new policy version and quietly age out of coverage",
          "OS-version-specific compatibility gaps that only surface once you're past the pilot ring (RHEL 8 vs. RHEL 9 behaving differently under the same policy)",
          "Subsidiaries or business units with change windows that don't align with the central rollout calendar",
          "Sensor upgrade failures that don't generate an obvious alert — the host just stops reporting current version",
          "Assumptions about asset inventory accuracy that don't hold once you cross-reference against the sensor's own reporting",
        ],
      },
      { type: "heading", text: "Structuring the rollout for provable coverage" },
      {
        type: "paragraph",
        text: "The practical approach that holds up at scale is tiered, not big-bang: a pilot ring, a validation period with explicit rollback criteria, then staged expansion by business unit or subsidiary with a coverage checkpoint at each tier before moving to the next. At every checkpoint, the question isn't just \"did the upgrade succeed\" — it's \"can I show, right now, exactly which endpoints are on the target version and which aren't, and why.\"",
      },
      {
        type: "quote",
        text: "An upgrade that completes silently and an upgrade you can prove completed are two different projects. Only one of them survives an audit.",
      },
      { type: "heading", text: "Turning the rollout into audit evidence" },
      {
        type: "list",
        items: [
          "Coverage reporting broken out by tier, subsidiary, and OS version — not just a single fleet-wide percentage",
          "A documented exception list for endpoints that can't be upgraded on schedule, with compensating controls noted",
          "Version drift tracking after the rollout completes, since coverage decays quietly without ongoing monitoring",
          "Mapping the upgrade evidence directly to the controls it supports — NIST CSF, ISO 27001, SOC 2 — rather than producing it as a one-off spreadsheet after the fact",
        ],
      },
      {
        type: "paragraph",
        text: "None of this is exotic. It's discipline applied at a scale where manual tracking stops working — treating a sensor upgrade less like a change ticket and more like a program with its own reporting cadence, exception process, and audit trail.",
      },
    ],
    disclosure:
      "This reflects hands-on professional experience running enterprise-scale endpoint programs, not a current SecureBit client engagement.",
  },
];

export const getBlogPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
