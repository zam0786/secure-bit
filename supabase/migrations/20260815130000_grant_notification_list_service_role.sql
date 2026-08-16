-- Restrict notification queue discovery to the service role.
-- This function is SECURITY DEFINER and must never be callable
-- by anonymous or authenticated clients.

REVOKE ALL ON FUNCTION public.list_contact_submissions_needing_notification(integer, integer, integer)
  FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.list_contact_submissions_needing_notification(integer, integer, integer)
  TO service_role;