#!/usr/bin/env bash
# Run this from your repo root (secure-bit/) BEFORE copying in the new/modified files.
# Deletes the orphaned Lovable files that were left behind by the last two deliveries --
# they're unreferenced by the app (build/typecheck already confirmed this) but their
# continued presence is currently breaking `npm run typecheck` and `npm run lint` in CI,
# which now run before every deploy.
set -euo pipefail

rm -rf src/integrations/lovable
rm -f src/pages/OAuthConsent.tsx
rm -rf src/lib/mcp
rm -rf supabase/functions/mcp

# .env should not be tracked in git (values are non-secret, but it's not good hygiene).
# .gitignore already excludes it going forward; this just stops tracking the current copy.
git rm --cached .env 2>/dev/null || true

echo "Done. Now copy in the files from secure-bit-phase1-validation/ (overwrite existing),"
echo "then: git add -A && git commit -m '...' && git push"
