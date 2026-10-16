# RannLab lead connector

Receives the landing-page form, signs it (HMAC-SHA256) and forwards it to the RannCX Lead Intake API.
The RannCX keys live **only** in this connector's environment variables — never in the website code.

## Deploy anywhere (Vercel shown)
1. Create a Vercel project from this folder (`vercel deploy --prod`).
2. Set environment variables:
   - `RANNCX_LEAD_INTAKE_KEY_ID` — rk_live_…
   - `RANNCX_LEAD_INTAKE_SECRET` — the intake secret
   - `ALLOWED_ORIGINS` — optional, extra sites allowed to post (comma-separated).
     Any `https://*.rannlab.com` domain is already allowed.
3. Put the connector URL in the website's `app/site.ts` → `leadEndpoint`.

## Moving the website
- To any `rannlab.com` domain or subdomain: nothing to change.
- To another domain: add it to `ALLOWED_ORIGINS` and redeploy the connector.
