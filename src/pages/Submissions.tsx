import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Building2, Phone, Clock, CheckCircle2, Circle, LogOut, Shield } from "lucide-react";

interface Submission {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string | null;
  topic: string | null;
  message: string;
  created_at: string;
  notified_at: string | null;
  handled_at: string | null;
  handled_by: string | null;
}

// Note: the checks in this component are a UX convenience only. The real access boundary
// is enforced in Postgres via Row-Level Security (see the "Admins can view/update contact
// submissions" policies) -- a non-admin authenticated user hitting this page will simply
// get an empty/blocked query result, not real data.
const Submissions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("contact_submissions")
      .select(
        "id, name, email, company, phone, topic, message, created_at, notified_at, handled_at, handled_by"
      )
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) {
      setError(
        "Could not load submissions. Your account may not have admin access, or something went wrong."
      );
      return;
    }
    setSubmissions(data ?? []);
  }, []);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (!data.session) {
        navigate("/auth?next=/submissions", { replace: true });
        return;
      }
      setUserId(data.session.user.id);
      setCheckingAuth(false);
      load();
    });
    return () => {
      active = false;
    };
  }, [navigate, load]);

  const toggleHandled = async (submission: Submission) => {
    setUpdatingId(submission.id);
    const marking = !submission.handled_at;
    const { error } = await supabase
      .from("contact_submissions")
      .update({
        handled_at: marking ? new Date().toISOString() : null,
        handled_by: marking ? userId : null,
      })
      .eq("id", submission.id);
    setUpdatingId(null);
    if (error) {
      toast({
        title: "Couldn't update",
        description: "That change didn't save. Please try again.",
        variant: "destructive",
      });
      return;
    }
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === submission.id
          ? {
              ...s,
              handled_at: marking ? new Date().toISOString() : null,
              handled_by: marking ? userId : null,
            }
          : s
      )
    );
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (checkingAuth) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Checking access…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-16">
      <Helmet>
        <title>Submissions | SecureBit Security Team Portal</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" aria-hidden="true" />
            <h1 className="font-display text-2xl font-semibold">Contact Submissions</h1>
          </div>
          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="w-4 h-4" aria-hidden="true" />
            Sign out
          </Button>
        </div>

        {loading && <p className="text-muted-foreground">Loading…</p>}

        {error && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-6 text-sm text-destructive">
            {error}
          </div>
        )}

        {!loading && !error && submissions.length === 0 && (
          <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
            No submissions yet.
          </div>
        )}

        <div className="space-y-4">
          {submissions.map((s) => (
            <Card key={s.id} className="border-border bg-card">
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                <div>
                  <h2 className="font-display text-lg font-semibold">{s.name}</h2>
                  <p className="text-sm text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                      <a href={`mailto:${s.email}`} className="hover:text-primary">
                        {s.email}
                      </a>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                      {s.company}
                    </span>
                    {s.phone && (
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                        {s.phone}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      {new Date(s.created_at).toLocaleString()}
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {s.topic && (
                      <span className="inline-block text-xs font-medium text-primary bg-primary/10 rounded-full px-2.5 py-1">
                        {s.topic}
                      </span>
                    )}
                    {s.notified_at && (
                      <span className="inline-block text-xs font-medium text-muted-foreground border border-border rounded-full px-2.5 py-1">
                        Email notification sent
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant={s.handled_at ? "outline" : "cyberOutline"}
                  size="sm"
                  disabled={updatingId === s.id}
                  onClick={() => toggleHandled(s)}
                  className="flex-shrink-0"
                >
                  {s.handled_at ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      Handled
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4" aria-hidden="true" />
                      Mark handled
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                  {s.message}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Submissions;
