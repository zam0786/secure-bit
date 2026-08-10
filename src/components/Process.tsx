import { motion } from "framer-motion";
import { ClipboardList, FileText, Wrench, RefreshCw } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Free Assessment",
    description:
      "A senior IT and cybersecurity specialist conducts a comprehensive assessment of your business, technology environment, security challenges, and operational requirements.",
  },
  {
    step: "02",
    icon: FileText,
    title: "Business-Focused Game Plan",
    description:
      "You receive an executive summary and proposal that includes detailed assessment findings, recommendations aligned with your business objectives, a 12- to 24-month CapEx and OpEx budget, multiple service and implementation options, and proposed service-level agreements.",
  },
  {
    step: "03",
    icon: Wrench,
    title: "Resolve Problems and Strengthen Your IT",
    description:
      "Once you approve the plan, you receive access to our support team and a dedicated project manager. We address critical issues, reduce your IT backlog, and begin improving your systems, processes, and security controls.",
  },
  {
    step: "04",
    icon: RefreshCw,
    title: "Ongoing Improvement",
    description:
      "After implementation, our specialists continue reviewing your environment, identifying opportunities to automate processes, improve productivity, reduce costs, and keep your technology aligned with your business needs.",
  },
];

const Process = () => {
  return (
    <section id="process" className="py-24 relative bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Our Process
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 mb-6">
            How We Work
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A clear, four-step engagement designed to assess, plan, implement, and continuously
            improve your cybersecurity posture.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors"
            >
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="text-primary font-display font-bold text-sm">{item.step}</span>
              </div>
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
