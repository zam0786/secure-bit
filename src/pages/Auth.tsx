import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { lovable } from "@/integrations/lovable/index";

/** Only same-origin relative paths are accepted as a post-auth destination. */
function safeNext(value: string | null): string {
  if (!value) return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

const Auth = () => {
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
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
    setMessage(null);
    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}${next}` },
      });
      setBusy(false);
      if (error) return setError(error.message);
      if (!data.session) return setMessage("Check your email to confirm your account, then sign in.");
      window.location.replace(next);
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return setError(error.message);
    window.location.replace(next);
  }

  async function google() {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
    });
    if (result.error) return setError(result.error.message ?? "Google sign-in failed.");
    if (result.redirected) return;
    window.location.replace(next);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-20">
      <Helmet>
        <title>Sign In | SecureBit Security Team Portal</title>
        <meta
          name="description"
          content="Sign in to the SecureBit security team portal to review inbound enquiries and connect approved AI clients to your account."
        />
        <link rel="canonical" href="https://secure-bit.lovable.app/auth" />
        <meta property="og:title" content="Sign In | SecureBit Security Team Portal" />
        <meta
          property="og:description"
          content="Security team access for reviewing inbound enquiries and connecting AI clients."
        />
        <meta property="og:url" content="https://secure-bit.lovable.app/auth" />
      </Helmet>
      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader className="space-y-2">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="font-display text-2xl font-semibold leading-none tracking-tight">
            {mode === "signin" ? "Sign in to SecureBit" : "Create your SecureBit account"}
          </h1>
          <CardDescription>
            Security team access for reviewing inbound enquiries and connecting AI clients.
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
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                required
                minLength={8}
                maxLength={72}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            {message && <p className="text-sm text-muted-foreground">{message}</p>}
            <Button type="submit" variant="cyber" className="w-full" disabled={busy}>
              {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>
          <Button type="button" variant="outline" className="w-full" onClick={google} disabled={busy}>
            Continue with Google
          </Button>
          <button
            type="button"
            className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setMessage(null);
            }}
          >
            {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </CardContent>
      </Card>
    </main>
  );
};

export default Auth;