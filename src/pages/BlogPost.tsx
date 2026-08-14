import { Link, useParams, Navigate } from "react-router-dom";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/home/FinalCTA";
import { Button } from "@/components/ui/button";
import { Check, Clock, Copy, Linkedin } from "lucide-react";
import { getBlogPost, type BlogBlock } from "@/data/blog";
import { useState } from "react";

const renderBlock = (block: BlogBlock, i: number) => {
  switch (block.type) {
    case "heading":
      return (
        <h2 key={i} className="font-display text-2xl font-bold mt-10 mb-4">
          {block.text}
        </h2>
      );
    case "list":
      return (
        <ul key={i} className="space-y-2.5 my-6">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2.5 text-muted-foreground leading-relaxed">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="border-l-2 border-primary pl-5 my-8 text-foreground text-lg font-medium leading-relaxed italic"
        >
          {block.text}
        </blockquote>
      );
    default:
      return (
        <p key={i} className="text-muted-foreground leading-relaxed my-5">
          {block.text}
        </p>
      );
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? getBlogPost(slug) : undefined;
  const [copied, setCopied] = useState(false);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(post.linkedinTeaser);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <Seo title={`${post.title} | SecureBit`} description={post.excerpt} path={`/blog/${post.slug}`} />
      <PageHero eyebrow={post.category} title={post.title} text={post.excerpt}>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" aria-hidden="true" />
          {post.readTime}
        </div>
      </PageHero>

      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          {post.content.map(renderBlock)}

          {post.disclosure && (
            <p className="text-xs text-muted-foreground border-t border-border pt-6 mt-10">
              {post.disclosure}
            </p>
          )}

          <div className="mt-12 rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Linkedin className="w-4 h-4 text-primary" aria-hidden="true" />
              <h3 className="font-display text-sm font-semibold">Share this on LinkedIn</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {post.linkedinTeaser}
            </p>
            <Button variant="cyberOutline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4" aria-hidden="true" />
              {copied ? "Copied" : "Copy teaser text"}
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/blog" className="text-sm font-medium text-primary hover:underline">
          ← Back to all insights
        </Link>
      </div>

      <FinalCTA
        heading="Working through something similar?"
        text="We can help you assess, design, and roll out the same kind of control in your own environment."
      />
    </>
  );
};

export default BlogPost;
