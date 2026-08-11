interface PageHeroProps {
  eyebrow?: string;
  title: string;
  text: string;
  children?: React.ReactNode;
}

const PageHero = ({ eyebrow, title, text, children }: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-cyber-grid opacity-[0.1]" aria-hidden="true" />
      <div className="container mx-auto px-4 relative z-10 py-20 md:py-24">
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-6">{title}</h1>
          <p className="text-lg text-muted-foreground">{text}</p>
          {children && <div className="mt-9">{children}</div>}
        </div>
      </div>
    </section>
  );
};

export default PageHero;