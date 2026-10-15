/**
 * Single source of truth for every business detail used on the landing page.
 * Change values here — the page, SEO tags and JSON-LD all read from this file.
 */
export const SITE = {
  brand: "Midvana Intelligence",
  /** Final public URL of this page (used for canonical, OG and schema). No trailing slash. */
  url: "https://react-setup-xi-rose.vercel.app",
  mainSite: "https://midvanaintelligence.com",
  phoneDisplay: "+91 95829 94410",
  phoneE164: "+919582994410",
  whatsappNumber: "919582994410",
  email: "info@midvanaintelligence.com",
  address: {
    street: "Sector 63",
    city: "Noida",
    region: "Uttar Pradesh",
    postalCode: "201307",
    country: "IN",
  },
  social: {
    facebook: "https://www.facebook.com/midvana.nz",
    instagram: "https://www.instagram.com/midvana.nz/",
  },
  legal: {
    terms: "https://midvanaintelligence.com/terms-condition/",
    refund: "https://midvanaintelligence.com/refund-policy/",
    privacy: "https://midvanaintelligence.com/privacy-policy/",
  },
  /**
   * Optional: POST endpoint for leads (Web3Forms, Formspree, your CRM webhook…).
   * Leave empty and every enquiry is sent straight to WhatsApp instead.
   */
  leadEndpoint: "",
} as const;

export const SEO = {
  title: "WooCommerce Website Development Company in India | Midvana",
  description:
    "Get a fast, mobile-first WooCommerce store built in India — UPI, Razorpay & COD payments, GST invoices, Shiprocket shipping and SEO set up. Free quote in 24 hours.",
  ogImage: "/og-woocommerce.png",
} as const;

export function waLink(text: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const WA_DEFAULT = waLink(
  "Hi Midvana, I want a WooCommerce website for my business. Please share details."
);
