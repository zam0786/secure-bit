import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <Helmet>
        <title>Page Not Found | SecureBit</title>
        <meta name="robots" content="noindex, follow" />
        <meta
          name="description"
          content="The page you were looking for could not be found. Explore SecureBit's cybersecurity services or get in touch."
        />
      </Helmet>
      <div className="text-center">
        <h1 className="mb-4 font-display text-4xl font-bold">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">
          We couldn&apos;t find the page you were looking for.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-primary">
          <Link to="/" className="underline hover:text-primary/90">
            Return home
          </Link>
          <Link to="/services" className="underline hover:text-primary/90">
            View services
          </Link>
          <Link to="/contact" className="underline hover:text-primary/90">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
