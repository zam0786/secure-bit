import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

type AuthorizationDetails = {
  client?: { name?: string; client_name?: string; redirect_uri?: string } | null;
  scope?: string | null;
  redirect_url?: string | null;
  redirect_to?: string | null;
};

type OAuthNamespace = {
  getAuthorizationDetails: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
};

const oauth = () => (supabase.auth as unknown as { oauth: OAuthNamespace }).oauth;

const SCOPE_LABELS: Record<string, string> = {
  openid: "Confirm your identity",
  email: "Share your email address",
  profile: "Share your basic profile",
};

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("This authorization request is missing its identifier.");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = `/auth?next=${encodeURIComponent(next)}`;
        return;
      }
      setAccount(sess.session.user.email ?? null);
      const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await oauth().approveAuthorization(authorizationId)
      : await oauth().denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect was returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  const clientName = details?.client?.name ?? details?.client?.client_name ?? "this client";
  const scopes = (details?.scope ?? "").split(/\s+/).filter(Boolean);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-20">
      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader className="space-y-2">
          <Shield className="w-8 h-8 text-primary" />
          <CardTitle className="font-display text-2xl">
            {error ? "Authorization problem" : details ? `Connect ${clientName} to SecureBit` : "Loading…"}
          </CardTitle>
          <CardDescription>
            {error
              ? error
              : details
                ? `This lets ${clientName} use SecureBit as you.`
                : "Checking this authorization request."}
          </CardDescription>
        </CardHeader>
        {details && !error && (
          <CardContent className="space-y-4">
            {account && (
              <p className="text-sm text-muted-foreground">
                Signed in as <span className="text-foreground">{account}</span>
              </p>
            )}
            {details.client?.redirect_uri && (
              <p className="text-sm text-muted-foreground break-all">
                Redirects to <span className="text-foreground">{details.client.redirect_uri}</span>
              </p>
            )}
            <ul className="space-y-1 text-sm text-muted-foreground">
              {scopes.map((scope) => (
                <li key={scope}>• {SCOPE_LABELS[scope] ?? `Additional permission requested: ${scope}`}</li>
              ))}
              <li>• Call SecureBit's enabled tools while you are signed in</li>
            </ul>
            <p className="text-xs text-muted-foreground">
              This does not bypass SecureBit's permissions or backend policies.
            </p>
            <div className="flex gap-3">
              <Button variant="cyber" className="flex-1" disabled={busy} onClick={() => decide(true)}>
                {busy ? "Please wait…" : "Approve"}
              </Button>
              <Button variant="outline" className="flex-1" disabled={busy} onClick={() => decide(false)}>
                Cancel connection
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </main>
  );
};

export default OAuthConsent;