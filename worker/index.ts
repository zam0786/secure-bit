/**
 * SecureBit edge Worker.
 *
 * Root cause: Cloudflare Workers Static Assets does not reliably apply
 * `public/_headers` rules to every asset path in production (confirmed:
 * /robots.txt returned 200 with no security headers despite a /* rule).
 * A second, deeper issue compounds this: assets.run_worker_first defaults
 * to false, so any request matching a static file is served directly by
 * Cloudflare's asset handler and never reaches a Worker script at all.
 *
 * This Worker is the minimal middleware fix: it serves static assets via
 * the ASSETS binding and stamps the required security header set onto
 * every HTTPS response before returning it.
 *
 * Does NOT touch React or Supabase code. Pure edge-layer header injection.
 */

export interface Env {
  ASSETS: Fetcher;
}

const SECURITY_HEADERS: Record<string, string> = {
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy": [
    "default-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "script-src 'self' https://static.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://cloudflareinsights.com",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; "),
};

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    // Serve the request from static assets (/, /robots.txt, /sitemap.xml,
    // /assets/*, and SPA routes via not_found_handling).
    const assetResponse = await env.ASSETS.fetch(request);

    // Response objects from the ASSETS binding have immutable headers —
    // wrap in a new Response with the same body/status so headers can be set.
    const response = new Response(assetResponse.body, assetResponse);

    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      response.headers.set(name, value);
    }

    return response;
  },
};
