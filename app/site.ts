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
  phoneAltDisplay: "+91 88000 25033",
  whatsappNumber: "918800025033",
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
   * Leads are POSTed here (app/routes/api.lead.ts), which signs and forwards them to RannCX.
   * The visitor is also handed off to WhatsApp. Set to "" to use WhatsApp only.
   */
  leadEndpoint: "/api/lead",
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
