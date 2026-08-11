import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/home/FinalCTA";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const offerings = [
  { title: "Cybersecurity awareness training", text: "Role-based fundamentals for every employee." },
  { title: "Phishing awareness", text: "Recognizing and reporting social engineering attempts." },
  { title: "Executive cybersecurity training", text: "Risk, oversight, and decision-making for leadership." },
  { title: "Technical security workshops", text: "Hands-on sessions for engineering and IT teams." },
  { title: "Security leadership training", text: "Building and running a security program." },
  { title: "AI security training", text: "Using AI tools without exposing sensitive information." },
  { title: "CISSP preparation", text: "Structured preparation for certification candidates." },
  { title: "Customized cybersecurity workshops", text: "Built around your environment and priorities." },
];

const Training = () => {
  return (
    <>
      <Seo
        title="Cybersecurity Training | SecureBit"
        description="Practical, role-based cybersecurity training from SecureBit: security awareness, phishing awareness, executive briefings, technical workshops, AI security training, and CISSP preparation."
        path="/services/training"
      />
      <PageHero
        eyebrow="Training"
        title="Build a Security-Ready Organization"
        text="Technology alone cannot eliminate cyber risk. SecureBit helps organizations strengthen security awareness and capabilities through practical, role-based training."
      >
        <Button variant="cyber" asChild>
          <Link to="/contact">Explore Training</Link>
        </Button>
      </PageHero>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold mb-12 max-w-2xl">
            Training programs we deliver
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {offerings.map((item) => (
              <article key={item.title} className="surface-card">
                <GraduationCap className="w-5 h-5 text-primary mb-4" aria-hidden="true" />
                <h3 className="font-display text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Ready to train your team?"
        text="Tell us who needs training and what you want them to be able to do differently, and we will propose a practical program."
      />
    </>
  );
};

export default Training;