/**
 * RannLab lead connector: receives website form leads and forwards them to the
 * RannCX Lead Intake API as an HMAC-SHA256 signed request.
 *
 * Environment variables (Vercel → Settings → Environment Variables):
 *   RANNCX_LEAD_INTAKE_KEY_ID   rk_live_…            (required)
 *   RANNCX_LEAD_INTAKE_SECRET   intake secret          (required, never commit)
 *   ALLOWED_ORIGINS             comma-separated site origins allowed to post here
 *   RANNCX_API_BASE             default https://cx.rannlab.com
 *   RANNCX_NOTICE_VERSION       default privacy-v3
 */
import { createHash, createHmac, randomUUID } from "node:crypto";

const INTAKE_PATH = "/api/v1/intake/leads";
const DEFAULT_ORIGINS = "https://react-setup-xi-rose.vercel.app,http://localhost:3123";
const clip = (v, max) => String(v ?? "").trim().slice(0, max);

/** Same rules as the browser form (the website's app/lib/enhance.ts) and the lead connector. */
function phoneError(p) {
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
function nameError(n) {
  if (n.length < 2 || !/^[\p{L} .'-]+$/u.test(n) || !/\p{L}.*\p{L}/u.test(n)) return "invalid";
  if (/^(.)\1+$/u.test(n.replace(/\s/g, "").toLowerCase())) return "invalid";
  return "";
}


/**
 * Which sites may post leads. ALLOWED_ORIGINS is a comma-separated list; each entry is either
 * an exact origin ("https://shop.example.com") or a domain wildcard ("*.rannlab.com", which also
 * matches rannlab.com itself). Any RannLab domain or subdomain works out of the box, so the
 * landing pages can move to a new host without touching this connector.
 */
const BUILTIN = ["*.rannlab.com", "https://react-setup-xi-rose.vercel.app", "http://localhost:3123"];
function allowed(origin) {
  if (!origin) return false;
  let host = "", proto = "";
  try { const u = new URL(origin); host = u.hostname; proto = u.protocol; } catch { return false; }
  const list = [...BUILTIN, ...(process.env.ALLOWED_ORIGINS || DEFAULT_ORIGINS).split(",")].map((s) => s.trim()).filter(Boolean);
  return list.some((e) => {
    if (e.startsWith("*.")) {
      const d = e.slice(2).toLowerCase();
      return proto === "https:" && (host === d || host.endsWith("." + d));
    }
    return e === origin;
  });
}

function reply(data, status, origin) {
  const headers = { "Content-Type": "application/json", "Cache-Control": "no-store", Vary: "Origin" };
  if (allowed(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
    headers["Access-Control-Max-Age"] = "86400";
  }
  return new Response(data === null ? null : JSON.stringify(data), { status, headers });
}

export function OPTIONS(request) {
  const origin = request.headers.get("Origin");
  return reply(null, allowed(origin) ? 204 : 403, origin);
}

export function GET(request) {
  return reply({ ok: true, service: "rannlab-lead-connector" }, 200, request.headers.get("Origin"));
}

export async function POST(request) {
  const origin = request.headers.get("Origin");
  if (!allowed(origin)) return reply({ error: "Forbidden" }, 403, origin);

  let input;
  try {
    const raw = await request.text();
    if (raw.length > 8000) return reply({ error: "Payload too large" }, 413, origin);
    input = JSON.parse(raw);
  } catch {
    return reply({ error: "Invalid JSON" }, 400, origin);
  }

  // Honeypot: real visitors never fill this hidden field.
  if (clip(input.website, 200)) return reply({ ok: true }, 200, origin);

  const name = clip(input.name, 120).replace(/\s+/g, " ");
  const phone = clip(input.phone, 20).replace(/[\s()-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "");
  if (nameError(name) || phoneError(phone)) {
    return reply({ error: "Please enter a valid name and 10-digit mobile number." }, 422, origin);
  }

  const secret = process.env.RANNCX_LEAD_INTAKE_SECRET;
  const keyId = process.env.RANNCX_LEAD_INTAKE_KEY_ID;
  if (!secret || !keyId) return reply({ error: "Lead intake is not configured" }, 503, origin);

  const [firstName, ...rest] = name.split(/\s+/);
  const utm = input.utm && typeof input.utm === "object" ? input.utm : {};
  let landingPage = "/";
  try {
    landingPage = new URL(clip(input.page, 500) || "/", origin).pathname;
  } catch {
    /* keep "/" */
  }

  const customFields = { service_interest: clip(input.need, 120) || "E-commerce Website Development", website: origin, landing_page: landingPage };
  const details = clip(input.details, 500);
  if (details) customFields.business_details = details;
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "fbclid"]) {
    const v = clip(utm[k], 200);
    if (v) customFields[k] = v;
  }

  const contact = { firstName, phone: `+91${phone}` };
  if (rest.length) contact.lastName = rest.join(" ");

  const body = JSON.stringify({
    contact,
    attribution: {
      campaign: clip(utm.utm_campaign, 100) || (landingPage.includes("shopify") ? "shopify-landing" : landingPage.includes("ecommerce") ? "ecommerce-landing" : "woocommerce-landing"),
      medium: clip(utm.utm_medium, 100) || "website",
      landingPage,
    },
    consent: {
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
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.error("[lead] RannCX intake failed", res.status, (await res.text()).slice(0, 500));
      return reply({ error: "Could not save lead" }, 502, origin);
    }
    console.log("[lead] forwarded to RannCX", res.status, origin, landingPage, JSON.stringify(Object.fromEntries(Object.entries(customFields).filter(([k]) => /^(utm_|gclid|gbraid|wbraid|fbclid)/.test(k)))));
    return reply({ ok: true }, 200, origin);
  } catch (err) {
    console.error("[lead] RannCX intake error", err);
    return reply({ error: "Could not reach lead intake" }, 502, origin);
  }
}
