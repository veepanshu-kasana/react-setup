/**
 * POST /api/lead — server-side lead intake.
 *
 * The browser posts the form here; this route validates it and forwards it to the
 * RannCX Lead Intake API with an HMAC-SHA256 signed request. The signing secret only
 * ever lives on the server (env var), never in the page.
 *
 * Required env vars (set in Vercel → Project → Settings → Environment Variables):
 *   RANNCX_LEAD_INTAKE_SECRET   the intake secret (never commit it)
 *   RANNCX_LEAD_INTAKE_KEY_ID   the key id (rk_live_…)
 * Optional:
 *   RANNCX_API_BASE             defaults to https://cx.rannlab.com
 *   RANNCX_NOTICE_VERSION       privacy notice version shown on the form (default privacy-v3)
 */
import { createHash, createHmac, randomUUID } from "node:crypto";
import type { Route } from "./+types/api.lead";

const INTAKE_PATH = "/api/v1/intake/leads";
const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

const clip = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

/** Same rules as the browser form (app/lib/enhance.ts) and the lead connector. */
function phoneError(p: string) {
  if (!/^\d{10}$/.test(p) || !/^[6-9]/.test(p)) return "invalid";
  const distinct = new Set(p.split("")).size;
  let run = 1, maxRun = 1, prev = 0;
  for (let i = 1; i < 10; i++) {
    const d = +p[i] - +p[i - 1];
    const seq = d === 1 || d === -1;
    run = seq && d === prev ? run + 1 : seq ? 2 : 1;
    prev = d;
    maxRun = Math.max(maxRun, run);
  }
  const fake = ["9876543210", "9123456789", "9012345678", "8765432109", "7894561230", "9638527410", "9988776655", "9876598765", "9999988888"];
  if (distinct < 4 || /(\d)\1{5,}/.test(p) || /^(\d{2})\1{4}$/.test(p) || /^(\d{5})\1$/.test(p) || maxRun >= 8 || fake.includes(p)) return "fake";
  return "";
}
function nameError(n: string) {
  if (n.length < 2 || !/^[\p{L} .'-]+$/u.test(n) || !/\p{L}.*\p{L}/u.test(n)) return "invalid";
  if (/^(.)\1+$/u.test(n.replace(/\s/g, "").toLowerCase())) return "invalid";
  return "";
}


export async function loader() {
  return json({ error: "Method not allowed" }, 405);
}

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  // Only accept submissions from this site's own pages.
  const origin = request.headers.get("Origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json({ error: "Forbidden" }, 403);
  }

  let input: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 8_000) return json({ error: "Payload too large" }, 413);
    input = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  // Honeypot: real visitors never fill this hidden field.
  if (clip(input.website, 200)) return json({ ok: true });

  const name = clip(input.name, 120).replace(/\s+/g, " ");
  const phone = clip(input.phone, 20).replace(/[\s()-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "");
  if (nameError(name) || phoneError(phone)) {
    return json({ error: "Please enter a valid name and 10-digit mobile number." }, 422);
  }

  const secret = process.env.RANNCX_LEAD_INTAKE_SECRET;
  const keyId = process.env.RANNCX_LEAD_INTAKE_KEY_ID;
  if (!secret || !keyId) {
    console.error("[lead] RANNCX_LEAD_INTAKE_SECRET / RANNCX_LEAD_INTAKE_KEY_ID not configured");
    return json({ error: "Lead intake is not configured" }, 503);
  }

  const [firstName, ...rest] = name.split(/\s+/);
  const lastName = rest.join(" ");
  const utm = (input.utm && typeof input.utm === "object" ? input.utm : {}) as Record<string, unknown>;
  let landingPage = "/";
  try {
    landingPage = new URL(clip(input.page, 500) || "/", request.url).pathname;
  } catch {
    /* keep "/" */
  }

  const customFields: Record<string, string> = {
    service_interest: clip(input.need, 120) || "E-commerce Website Development",
  };
  const details = clip(input.details, 500);
  if (details) customFields.business_details = details;
  const source = clip(utm.utm_source, 100);
  if (source) customFields.utm_source = source;
  const gclid = clip(utm.gclid, 200);
  if (gclid) customFields.gclid = gclid;

  const contact: Record<string, string> = { firstName, phone: `+91${phone}` };
  if (lastName) contact.lastName = lastName;

  const body = JSON.stringify({
    contact,
    attribution: {
      campaign: clip(utm.utm_campaign, 100) || "woocommerce-landing",
      medium: clip(utm.utm_medium, 100) || "website",
      landingPage,
    },
    consent: {
      // The form only asks permission to contact the visitor about their project.
      marketing: false,
      capturedAt: new Date().toISOString(),
      noticeVersion: process.env.RANNCX_NOTICE_VERSION || "privacy-v3",
    },
    customFields,
    externalReference: `woo-landing-${randomUUID()}`,
  });

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = randomUUID();
  const clientKey = clip(input.idempotencyKey, 64);
  const idempotencyKey = /^[\w-]{8,64}$/.test(clientKey) ? clientKey : randomUUID();
  const bodyHash = createHash("sha256").update(body, "utf8").digest("base64");
  const canonical = ["POST", INTAKE_PATH, timestamp, nonce, idempotencyKey, bodyHash].join("\n");
  const signature = createHmac("sha256", secret).update(canonical, "utf8").digest("base64");

  try {
    const res = await fetch(`${process.env.RANNCX_API_BASE || "https://cx.rannlab.com"}${INTAKE_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RannCX-Key-Id": keyId,
        "X-RannCX-Timestamp": timestamp,
        "X-RannCX-Nonce": nonce,
        "X-RannCX-Signature": `v1=${signature}`,
        "Idempotency-Key": idempotencyKey,
      },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[lead] RannCX intake failed", res.status, (await res.text()).slice(0, 500));
      return json({ error: "Could not save lead" }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error("[lead] RannCX intake error", err);
    return json({ error: "Could not reach lead intake" }, 502);
  }
}
