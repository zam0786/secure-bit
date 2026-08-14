import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/data/blog";

const InsightsTeaser = () => {
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="py-24 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Insights</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Field Notes From Real Security Work
            </h2>
            <p className="text-muted-foreground text-lg">
              Practical write-ups from real endpoint security and vulnerability management work —
              not theory.
            </p>
          </div>
          <Button variant="cyberOutline" asChild>
            <Link to="/blog">View All Insights</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="surface-card group flex flex-col"
            >
              <span className="text-xs font-medium tracking-wide uppercase text-primary bg-primary/10 rounded-full px-3 py-1 w-fit mb-4">
                {post.category}
              </span>
              <h3 className="font-display text-lg font-semibold mb-3">{post.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                {post.excerpt}
              </p>
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Read the write-up
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsTeaser;
