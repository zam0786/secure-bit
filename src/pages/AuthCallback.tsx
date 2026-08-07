import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

function safeNext(value: string | null): string {
  if (!value) return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

const AuthCallback = () => {
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) window.location.replace(next);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (data.session) window.location.replace(next);
      else setTimeout(() => active && setError("We could not complete sign-in. Please try again."), 4000);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [next]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 text-center">
      <p className="text-muted-foreground">{error ?? "Finishing sign-in…"}</p>
    </main>
  );
};

export default AuthCallback;