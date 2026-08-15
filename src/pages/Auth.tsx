import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { Helmet } from "react-helmet-async";

/** Only same-origin relative paths are accepted as a post-auth destination. */
function safeNext(value: string | null): string {
  if (!value) return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

// This portal is for SecureBit admin staff only. Accounts are provisioned out-of-band
// by an existing administrator (see README / internal runbook) -- there is intentionally
// no public self-signup form here, since anyone who could create an account here would
// be able to load this page (even though they still could not read or modify contact
// submissions, since that is enforced independently by Postgres RLS, not by this page).
const Auth = () => {
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) window.location.replace(next);
    });
  }, [next]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return setError(error.message);
    window.location.replace(next);
  }

  async function google() {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (error) setError(error.message ?? "Google sign-in failed.");
    // On success, Supabase navigates the browser to Google; nothing further to do here.
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-20">
      <Helmet>
        <title>Sign In | SecureBit Security Team Portal</title>
        <meta
          name="description"
          content="Sign in to the SecureBit security team portal to review inbound enquiries."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://securebit.ca/auth" />
        <meta property="og:title" content="Sign In | SecureBit Security Team Portal" />
        <meta
          property="og:description"
          content="Security team access for reviewing inbound enquiries."
        />
        <meta property="og:url" content="https://securebit.ca/auth" />
      </Helmet>
      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader className="space-y-2">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="font-display text-2xl font-semibold leading-none tracking-tight">
            Sign in to SecureBit
          </h1>
          <CardDescription>
            Security team access for reviewing inbound enquiries. Accounts are provisioned by an
            administrator -- there is no public sign-up.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                maxLength={255}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                minLength={8}
                maxLength={72}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" variant="cyber" className="w-full" disabled={busy}>
              {busy ? "Please wait…" : "Sign in"}
            </Button>
          </form>
          <Button type="button" variant="outline" className="w-full" onClick={google} disabled={busy}>
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default Auth;
