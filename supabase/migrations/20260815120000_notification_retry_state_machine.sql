-- Fixes an operational flaw in the original notify-submission idempotency design: claiming
-- notified_at *before* attempting the Graph send meant a failed send permanently looked
-- "notified" with no way to retry (duplicate-send was prevented, but at the cost of silent
-- notification loss on transient Graph/network failures).
--
-- Replaces it with an explicit status + lease + bounded-retry model:
--   pending  -> initial state for every row
--   claimed  -> an invocation has taken ownership (has a lease); if the lease expires
--               (claimed_at older than the timeout) without resolving, another invocation
--               may re-claim it
--   sent     -> Graph confirmed delivery; notified_at is set; terminal
--   failed   -> Graph attempt failed; may be re-claimed until notification_attempts
--               reaches the max, then it's terminal (surfaced in /submissions for a human)

ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS notification_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (notification_status IN ('pending', 'claimed', 'sent', 'failed')),
  ADD COLUMN IF NOT EXISTS notification_claimed_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS notification_attempts INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_notification_error TEXT;

-- Backfill: any row that already has notified_at set (from the prior design) is
-- unambiguously "sent" -- do not re-send on migrate.
UPDATE public.contact_submissions
SET notification_status = 'sent'
WHERE notified_at IS NOT NULL
  AND notification_status = 'pending';

-- Supports both the webhook's single-row claim and the sweep's batch scan efficiently.
CREATE INDEX IF NOT EXISTS contact_submissions_notification_eligible_idx
  ON public.contact_submissions (notification_status, notification_claimed_at, created_at);

-- Atomic claim: eligible rows are pending, OR claimed with an expired lease, OR failed
-- with attempts remaining. Returns the claimed row, or no row if nothing was eligible
-- (already sent, already validly claimed by another concurrent invocation, or exhausted
-- retries). SECURITY DEFINER + explicit search_path (same pattern as has_role() and
-- contact_submission_rate_ok() elsewhere in this schema); only ever called by the
-- notify-submission Edge Function using the service_role key, never exposed to anon/
-- authenticated.
CREATE OR REPLACE FUNCTION public.claim_contact_submission_for_notification(
  _id uuid,
  _lease_seconds integer DEFAULT 300,
  _max_attempts integer DEFAULT 5
)
RETURNS public.contact_submissions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  claimed_row public.contact_submissions;
BEGIN
  UPDATE public.contact_submissions
  SET notification_status = 'claimed',
      notification_claimed_at = now(),
      notification_attempts = notification_attempts + 1
  WHERE id = _id
    AND (
      notification_status = 'pending'
      OR (notification_status = 'claimed'
          AND notification_claimed_at < now() - make_interval(secs => _lease_seconds))
      OR (notification_status = 'failed' AND notification_attempts < _max_attempts)
    )
  RETURNING * INTO claimed_row;

  RETURN claimed_row; -- NULL if nothing matched (not eligible / already handled)
END;
$$;

REVOKE ALL ON FUNCTION public.claim_contact_submission_for_notification(uuid, integer, integer)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_contact_submission_for_notification(uuid, integer, integer)
  TO service_role;

-- Batch version for the sweep path (retrying stale/failed rows on a schedule rather than
-- only reacting to the INSERT webhook). Returns up to _limit eligible rows, oldest first,
-- WITHOUT claiming them -- the Edge Function still claims each one individually via the
-- function above, so two overlapping sweeps can never double-claim the same row.
CREATE OR REPLACE FUNCTION public.list_contact_submissions_needing_notification(
  _lease_seconds integer DEFAULT 300,
  _max_attempts integer DEFAULT 5,
  _limit integer DEFAULT 20
)
RETURNS SETOF public.contact_submissions
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT *
  FROM public.contact_submissions
  WHERE notification_status = 'pending'
     OR (notification_status = 'claimed'
         AND notification_claimed_at < now() - make_interval(secs => _lease_seconds))
     OR (notification_status = 'failed' AND notification_attempts < _max_attempts)
  ORDER BY created_at ASC
  LIMIT _limit
$$;

REVOKE ALL ON FUNCTION public.list_contact_submissions_needing_notification(integer, integer, integer)
  FROM PUBLIC, anon, authenticated;
