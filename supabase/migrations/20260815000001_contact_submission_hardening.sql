-- Phase 7/8: stronger server-side validation and abuse protection on contact form submissions.
-- Phase 9: separate "email notification sent" (notified_at) from "human handled" (handled_at/handled_by).

-- 1. Add columns for the handled-by-a-human workflow, distinct from notified_at
--    (which now represents "notification email sent").
ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS handled_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS handled_by UUID REFERENCES auth.users(id);

-- 2. Rate-limiting helper. Runs as SECURITY DEFINER so it can see existing rows for the
--    count check even though anon/authenticated have no SELECT grant on this table --
--    without this, a rate-limit subquery evaluated as the calling role would always see
--    zero rows and the check would be a no-op.
CREATE OR REPLACE FUNCTION public.contact_submission_rate_ok(_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    (SELECT count(*) FROM public.contact_submissions
       WHERE email = _email AND created_at > now() - interval '1 hour') < 5
    AND
    (SELECT count(*) FROM public.contact_submissions
       WHERE created_at > now() - interval '10 minutes') < 30
$$;

REVOKE ALL ON FUNCTION public.contact_submission_rate_ok(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.contact_submission_rate_ok(text) TO anon, authenticated;

-- 3. Replace the INSERT policy with stronger validation:
--    - email format check (not just length)
--    - reject CR/LF in any text field (header-injection / log-injection defense in depth)
--    - cap optional fields (phone, topic) that the original policy didn't cover
--    - enforce the rate limit above
DROP POLICY IF EXISTS "Anyone can submit the contact form" ON public.contact_submissions;

CREATE POLICY "Anyone can submit the contact form"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 2 AND 100
  AND name !~ '[\r\n]'
  AND char_length(email) BETWEEN 3 AND 255
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND email !~ '[\r\n]'
  AND char_length(company) BETWEEN 1 AND 100
  AND company !~ '[\r\n]'
  AND char_length(message) BETWEEN 10 AND 1000
  AND (phone IS NULL OR (char_length(phone) <= 30 AND phone !~ '[\r\n]'))
  AND (topic IS NULL OR (char_length(topic) <= 100 AND topic !~ '[\r\n]'))
  AND public.contact_submission_rate_ok(email)
);
