import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    tag: "Threat Intel",
    date: "Jul 2026",
    title: "The Quiet Rise of Session Token Theft",
    excerpt: "Why MFA alone no longer stops account takeover, and what to layer on top.",
  },
  {
    tag: "Compliance",
    date: "Jun 2026",
    title: "SOC 2 Without The Panic",
    excerpt: "A realistic 90-day path to audit readiness for small engineering teams.",
  },
  {
    tag: "Cloud",
    date: "May 2026",
    title: "Five Misconfigurations We Find In Every Cloud Audit",
    excerpt: "The recurring gaps that turn a minor bug into a full data exposure.",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Blog</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">
            Insights From The Front Line
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors flex flex-col"
            >
              <div className="flex items-center gap-3 text-xs mb-4">
                <span className="px-2 py-1 rounded bg-primary/10 text-primary font-medium">
                  {post.tag}
                </span>
                <span className="text-muted-foreground">{post.date}</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-6">{post.excerpt}</p>
              <span className="mt-auto inline-flex items-center gap-2 text-primary text-sm font-medium">
                Read article
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;