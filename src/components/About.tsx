import { Target, TrendingUp, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const helps = [
  "Identify and resolve underlying cybersecurity issues",
  "Protect intellectual property and sensitive data",
  "Improve security awareness through training",
  "Strengthen cybersecurity controls and processes",
  "Prepare for compliance requirements",
  "Reduce the risk and cost of security breaches",
];

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              About Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
              Cybersecurity That Supports Your Business
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Unresolved cybersecurity issues can disrupt productivity, increase costs, and hinder
              growth. SecureBIT helps you maintain and improve your existing security controls
              while monitoring emerging threats, risks, and vulnerabilities.
            </p>
            <p className="text-muted-foreground text-lg mb-8">
              Our customized service packages are designed to meet your business requirements while
              keeping costs predictable. Choose from monthly or annual plans that provide
              consistent cybersecurity support and help prevent unexpected issues from disrupting
              your operations.
            </p>

            <div className="space-y-3">
              {helps.map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-xl bg-card border border-border">
              <Target className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">
                Cybersecurity Aligned With Your Goals
              </h3>
              <p className="text-muted-foreground text-sm">
                Our team includes cybersecurity professionals with more than 20 years of combined
                industry experience, along with business specialists who understand the
                operational demands of different industries.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <TrendingUp className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">
                Built for Long-Term Growth
              </h3>
              <p className="text-muted-foreground text-sm">
                We work closely with your team to ensure your cybersecurity strategy supports your
                business objectives, budget, and long-term growth.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-2">Combined Experience</p>
              <p className="text-foreground font-display font-semibold text-2xl">
                20+ Years
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Across cybersecurity and business technology.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
