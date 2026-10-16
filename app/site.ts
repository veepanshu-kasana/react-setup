/**
 * Single source of truth for every business detail used on the landing page.
 * Change values here — the page, SEO tags and JSON-LD all read from this file.
 */
export const SITE = {
  brand: "RannLab Technologies",
  shortBrand: "RannLab",
  tagline: "Your Problems Are Our Priority",
  /** Final public URL of this page (used for canonical, OG and schema). No trailing slash. */
  url: "https://react-setup-xi-rose.vercel.app",
  mainSite: "https://rannlab.com",
  phoneDisplay: "+91 99906 13366",
  phoneE164: "+919990613366",
  whatsappNumber: "919990613366",
  email: "info@rannlab.com",
  address: {
    street: "805, Om Tower, Alpha-I Commercial Belt, Block E, Alpha I",
    city: "Greater Noida",
    region: "Uttar Pradesh",
    postalCode: "201310",
    country: "IN",
  },
  mapUrl: "https://maps.app.goo.gl/HDbajonfvrYxDQRe7",
  social: {
    linkedin: "https://www.linkedin.com/company/rannlab",
    instagram: "https://www.instagram.com/rannlab/",
    facebook: "https://www.facebook.com/rannlab",
    youtube: "https://www.youtube.com/@rannlab",
    x: "https://twitter.com/rannlab",
  },
  links: {
    about: "https://rannlab.com/about-us/",
    services: "https://rannlab.com/services/",
    ecommerce: "https://rannlab.com/industries/e-commerce/",
    caseStudies: "https://rannlab.com/case-studie/",
    contact: "https://rannlab.com/contact-us/",
  },
  legal: {
    privacy: "https://rannlab.com/privacy/",
    terms: "https://rannlab.com/terms-and-conditions/",
    refund: "https://rannlab.com/refund-and-cancellation-policy/",
  },
  /**
   * Where the form POSTs leads. The RannLab lead connector (separate Vercel project,
   * holds the RannCX keys) signs and forwards them to RannCX; the visitor is also handed
   * off to WhatsApp. "/api/lead" uses this site's own route instead (needs the
   * RANNCX_* env vars on this site's Vercel project). "" = WhatsApp only.
   */
  leadEndpoint: "https://rannlab-lead-connector.vercel.app/api/lead",
} as const;

export const SEO = {
  title: "WooCommerce Website Development Company in India | RannLab",
  description:
    "RannLab builds fast, mobile-first WooCommerce stores in India — UPI, Razorpay & COD, GST invoices, Shiprocket and SEO set up. Free quote in 24 hours.",
  ogImage: "/og-woocommerce.png",
} as const;

export function waLink(text: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const WA_DEFAULT = waLink(
  "Hi RannLab, I want a WooCommerce website for my business. Please share details."
);

/**
 * Ads & analytics IDs. Leave a value empty to switch that tag off — nothing loads until an ID is set.
 * Tags load after the page is idle, so they never slow the first paint.
 *  - gtmId:            Google Tag Manager container, e.g. "GTM-ABC1234" (use this OR the direct tags below)
 *  - ga4Id:            Google Analytics 4 measurement ID, e.g. "G-XXXXXXXXXX"
 *  - adsId:            Google Ads account tag, e.g. "AW-123456789"
 *  - adsLeadLabel:     Google Ads conversion label for "Lead form submit", e.g. "AbCdEfGh123"
 *  - adsContactLabel:  optional Google Ads conversion label for WhatsApp / call clicks
 *  - metaPixelId:      Meta (Facebook/Instagram) Pixel ID, e.g. "123456789012345"
 */
export const TRACKING = {
  gtmId: "",
  ga4Id: "",
  adsId: "",
  adsLeadLabel: "",
  adsContactLabel: "",
  metaPixelId: "",
} as const;
