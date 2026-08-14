import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import { ArrowUpRight, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";

const Blog = () => {
  return (
    <>
      <Seo
        title="Insights & Use Cases | SecureBit"
        description="Practical field notes from real endpoint security and vulnerability management work — ransomware detection over SMB, on-write script visibility, and endpoint coverage at scale."
        path="/blog"
      />
      <PageHero
        eyebrow="Insights"
        title="Field Notes From Real Security Work"
        text="Practical write-ups on the detection controls, rollouts, and audit challenges we've worked through directly — not theory, not marketing copy."
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article key={post.slug} className="surface-card group flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-medium tracking-wide uppercase text-primary bg-primary/10 rounded-full px-3 py-1">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="font-display text-xl font-semibold mb-3">{post.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-muted-foreground border border-border rounded-full px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  Read the write-up
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
