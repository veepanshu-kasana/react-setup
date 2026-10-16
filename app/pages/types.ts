import { createContext, useContext } from "react";
import type * as Woo from "../content";

/** Everything that differs between the landing pages. Layout and animation are shared. */
export type Page = {
  key: "woo" | "shopify" | "ecom";
  /** URL path, no trailing slash except for "/" */
  path: string;
  /** CSS class that sets the page's colour theme (see app.css, "Page themes") */
  theme: string;
  /** Short platform name used in copy and the WhatsApp message */
  platform: string;
  /** Footer / cross-link label */
  label: string;
  seo: { title: string; description: string; ogImage: string; ogAlt: string; serviceName: string };
  /** Layout choices so each page looks different */
  layout: {
    hero: "dark" | "light" | "centered" | "split";
    features: "prism" | "cards" | "ring";
    packages: "towers" | "cards";
    pains: "rows" | "cards" | "cards-dark";
    process: "stairs" | "timeline";
    faq: "chat" | "grid" | "dark";
    why: "globe" | "stats";
    cta: "phone" | "banner";
    order: SectionKey[];
  };
  /** H1 text before the tricolour "India" */
  h1: string;
  heroSub: string;
  /** Options for the lead form's "What do you need?" */
  needs: string[];
  story: {
    brandA: string;
    brandB: string;
    domain: string;
    banner: string;
    bannerSmall: string;
    bannerTitle: string;
    bannerSub: string;
    products: { img: string; name: string; price: string }[];
    orders: { img: string; t: string; d: string }[];
    formSell: string;
  };
  copy: {
    painsSub: string;
    featuresSub: string;
    featureFaces: string[];
    quoteSub: string;
    svcEyebrow: string;
    svcTitle: string;
    migrateFrom: string[];
    migrateTo: string;
    careChips: string[];
    processTitle: string;
    vsTag: string;
    whyBody: string;
    faqTitle: string;
    chatQ: string;
    chatQ2: string;
    chatA2: string;
    ctaTitle: string;
    ctaSub: string;
    ctaOrder: string;
  };
  c: {
    PLATFORMS: string[];
    PAINS: typeof Woo.PAINS;
    FEATURES: typeof Woo.FEATURES;
    SERVICES: typeof Woo.SERVICES;
    PROCESS: typeof Woo.PROCESS;
    PACKAGES: typeof Woo.PACKAGES;
    COMPARE: typeof Woo.COMPARE;
    PROOF: typeof Woo.PROOF;
    WHY: typeof Woo.WHY;
    FAQS: typeof Woo.FAQS;
    STORE_TYPES: typeof Woo.STORE_TYPES;
  };
};

export type SectionKey = "proof" | "pains" | "types" | "features" | "quote" | "services" | "process" | "packages" | "compare" | "why" | "faq" | "cta";

export const PageCtx = createContext<Page | null>(null);
export function usePage(): Page {
  const p = useContext(PageCtx);
  if (!p) throw new Error("usePage() outside <Landing>");
  return p;
}
