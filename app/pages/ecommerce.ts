import { PROOF, STORE_TYPES } from "../content";
import type { Page } from "./types";

export const ECOM: Page = {
  key: "ecom",
  path: "/ecommerce-development",
  theme: "theme-ecom",
  platform: "eCommerce",
  label: "eCommerce development",
  seo: {
    title: "eCommerce Website Development Company in India | RannLab",
    description:
      "Custom eCommerce websites, marketplaces and B2B portals for Indian businesses — UPI & COD, GST, shipping, apps and SEO. WooCommerce, Shopify or custom. Free quote in 24 hours.",
    ogImage: "/og-ecommerce.png",
    ogAlt: "eCommerce website development in India by RannLab Technologies",
    serviceName: "eCommerce Website Development",
  },
  layout: { hero: "split", features: "hub", packages: "towers", pains: "cards-dark", process: "stairs", faq: "dark", why: "globe", cta: "phone", order: ["proof", "services", "pains", "features", "types", "process", "quote", "compare", "packages", "why", "faq", "cta"] },
  h1: "eCommerce Website Development Company in",
  heroSub:
    "Fill a 30-second form or message us on WhatsApp. We plan, design and build your online store on WooCommerce, Shopify or a fully custom stack, with UPI, COD, GST and shipping ready, so you can focus on the orders.",
  needs: ["New eCommerce website", "Multi-vendor marketplace", "B2B / wholesale portal", "Store mobile app", "Migration or redesign", "Not sure yet"],
  story: {
    brandA: "Desi",
    brandB: "Haat",
    domain: "desihaat.in",
    banner: "/showcase/cat-handicrafts.webp",
    bannerSmall: "/showcase/cat-handicrafts-240.webp",
    bannerTitle: "Made by Indian artisans",
    bannerSub: "200+ sellers · COD available",
    products: [
      { img: "/showcase/cat-handicrafts-240.webp", name: "Hand-painted pot", price: "₹1,499" },
      { img: "/showcase/cat-spices-240.webp", name: "Spice gift box", price: "₹849" },
      { img: "/showcase/cat-decor-240.webp", name: "Terracotta vase", price: "₹1,199" },
      { img: "/showcase/cat-beauty-240.webp", name: "Herbal care set", price: "₹649" },
    ],
    orders: [
      { img: "/showcase/cat-handicrafts-240.webp", t: "New order · ₹1,499", d: "Paid via UPI" },
      { img: "/showcase/cat-spices-240.webp", t: "New order · ₹849", d: "Cash on delivery" },
      { img: "/showcase/cat-decor-240.webp", t: "Shipped · ₹1,199", d: "Seller pickup booked" },
    ],
    formSell: "Handicrafts marketplace",
  },
  copy: {
    painsSub: "These are the problems we hear most from Indian businesses selling online, and exactly what our eCommerce builds are designed to fix.",
    featuresSub: "Whatever platform we build on, every store comes with the payments, shipping, tax and tracking Indian businesses rely on.",
    featureFaces: ["UPI, cards & COD", "Shipping", "GST invoices", "WhatsApp alerts", "Fast on 4G", "SEO & tracking"],
    quoteSub: "No sales pressure. A RannLab eCommerce expert reviews your needs, suggests the right platform and sends a clear, itemised plan with price and timeline.",
    svcEyebrow: "Our eCommerce services",
    svcTitle: "Stores, marketplaces, B2B portals and apps",
    migrateFrom: ["Old website", "Shopify", "Magento", "OpenCart"],
    migrateTo: "New store",
    careChips: ["Daily backup", "SSL active", "Uptime checked"],
    processTitle: "From first call to launch, step by step",
    vsTag: "Your eCommerce partner",
    whyBody: "has spent 10+ years building web, mobile and custom software for businesses worldwide. Your online store gets the same engineering standards.",
    faqTitle: "eCommerce development: common questions",
    chatQ: "Hi! We want a marketplace for artisans. Can you build it?",
    chatQ2: "Can sellers get paid and ship from their own city?",
    chatA2: "Yes. Seller dashboards, split payouts, COD rules and multi-pickup shipping, all planned in.",
    ctaTitle: "Let's build your online store.",
    ctaSub: "Talk to a RannLab eCommerce expert today. Free consultation, fixed quote within 24 hours.",
    ctaOrder: "₹1,499 · Rohan M., Indore",
  },
  c: {
    PLATFORMS: ["WooCommerce", "Shopify", "Custom builds", "Razorpay", "PayU", "Shiprocket", "Tally", "Android & iOS"],
    PAINS: [
      {
        title: "A platform that doesn't fit the business",
        body: "Marketplaces, B2B pricing or custom products get forced into a template store, and the workarounds never end.",
        fix: "We pick the right foundation first — WooCommerce, Shopify or a custom build — based on your model, budget and growth plans.",
      },
      {
        title: "Orders, stock and accounts don't talk",
        body: "Teams copy orders into spreadsheets, stock goes out of sync and invoices are made by hand.",
        fix: "Payments, inventory, shipping, GST invoices and your ERP, CRM or Tally connected, so orders flow without manual work.",
      },
      {
        title: "A site that's slow, hard to find and hard to buy from",
        body: "Heavy pages, weak SEO and a long checkout lose customers on mobile before they ever reach “Place order”.",
        fix: "Fast, mobile-first pages, SEO from day one and a short checkout with UPI, COD and WhatsApp help.",
      },
    ],
    FEATURES: [
      { icon: "card", title: "Indian payments, done right", body: "UPI, cards, net banking and wallets via Razorpay, PayU, PhonePe or Cashfree — plus COD rules and split payouts for marketplaces." },
      { icon: "truck", title: "Shipping on autopilot", body: "Shiprocket or Delhivery, multi-warehouse and multi-seller pickups, live serviceability checks and tracking for buyers." },
      { icon: "receipt", title: "GST-compliant invoices", body: "Automatic invoices with GSTIN, HSN codes and the right tax split, for you, your sellers and your customers." },
      { icon: "chat", title: "WhatsApp order alerts", body: "Order, shipping and abandoned-cart messages on WhatsApp, where Indian buyers actually reply." },
      { icon: "bolt", title: "Fast on 4G phones", body: "Lightweight pages, optimised images, caching and CDN so the store loads quickly on budget Android phones." },
      { icon: "search", title: "SEO & tracking from day one", body: "Clean URLs, product schema, sitemap, Search Console, GA4 and Meta Pixel set up before launch." },
    ],
    SERVICES: [
      { icon: "cart", title: "Custom eCommerce website", body: "A store designed around your brand and products, on the platform that fits — ready to sell." },
      { icon: "refresh", title: "Migration & replatforming", body: "Move from an old site, Shopify, Magento or OpenCart with products, customers, orders and SEO intact." },
      { icon: "layers", title: "Multi-vendor marketplace", body: "Seller onboarding, dashboards, commissions, split payouts and multi-pickup shipping." },
      { icon: "bolt", title: "Store mobile apps", body: "Android and iOS shopping apps connected to your store, with push notifications and fast checkout." },
      { icon: "wrench", title: "B2B portals & integrations", body: "Wholesale pricing, quotes, credit limits and ERP, CRM or Tally sync built in." },
      { icon: "shield", title: "Care & growth support", body: "Updates, backups, security monitoring, new features and a real person to call." },
    ],
    PROCESS: [
      { step: "01", title: "Free consultation", time: "Day 1", body: "A 20-minute call about your business model and budget. We recommend the right platform and send a fixed quote within 24 hours." },
      { step: "02", title: "Plan & design", time: "Week 1–2", body: "Feature list, user flows and designs for key pages. Nothing goes into development until you approve it." },
      { step: "03", title: "Build & integrate", time: "Agreed timeline", body: "Development, payments, shipping, GST and integrations, tested on real phones with your team." },
      { step: "04", title: "Launch & grow", time: "Go-live", body: "Go live, submit to Google and train your team — then support and new features continue." },
    ],
    PACKAGES: [
      {
        name: "Launch Store",
        forWho: "New brands going online",
        price: "",
        featured: false,
        items: ["WooCommerce or Shopify build", "Mobile-first design", "UPI / Razorpay + COD", "GST invoices & shipping rates", "Basic on-page SEO", "1 month free support"],
      },
      {
        name: "Growth Commerce",
        forWho: "Growing brands & D2C",
        price: "",
        featured: true,
        items: ["Custom-designed key pages", "Up to 300 products uploaded", "Shiprocket + WhatsApp alerts", "Abandoned-cart recovery", "GA4, Meta Pixel & Search Console", "Speed optimisation", "3 months free support"],
      },
      {
        name: "Marketplace / Enterprise",
        forWho: "Marketplaces, B2B & custom builds",
        price: "",
        featured: false,
        items: ["Multi-vendor marketplace", "B2B / wholesale portal", "Custom features & APIs", "ERP, CRM or Tally sync", "Android & iOS apps", "Dedicated project manager"],
      },
    ],
    COMPARE: {
      cols: ["RannLab", "Typical freelancer", "DIY website builder"],
      rows: [
        { label: "Right platform chosen for your model", v: [true, "Sometimes", false] },
        { label: "Indian payments, COD & GST set up", v: [true, "Sometimes", "Extra apps"] },
        { label: "Marketplace, B2B & custom features", v: [true, false, false] },
        { label: "ERP, CRM or Tally integration", v: [true, false, "Limited"] },
        { label: "Fixed quote & written timeline", v: [true, false, true] },
        { label: "Support after launch", v: [true, false, "Ticket only"] },
        { label: "You own the code & data", v: [true, true, false] },
      ],
    },
    PROOF,
    WHY: [
      { icon: "layers", title: "A full product team, not one freelancer", body: "Designers, web and app developers, QA and SEO specialists work on your store together, under one project manager." },
      { icon: "shield", title: "Security built in", body: "Secure payment flows, SSL, access controls and daily backups, run by a team with ISO 27001 practices." },
      { icon: "chart", title: "Built to grow with you", body: "From a first store to marketplaces, apps and ERP integrations, the same team can take your business further." },
      { icon: "chat", title: "Support across time zones", body: "Talk to us on WhatsApp, phone or email. We support clients in India, the USA, UK, Canada and Australia." },
    ],
    FAQS: [
      {
        q: "How much does an eCommerce website cost in India?",
        a: "It depends on the platform, number of products, design and features such as marketplaces, B2B pricing or apps. Share your requirements and we send a fixed, itemised quote within 24 hours — no hidden charges.",
      },
      {
        q: "Which platform is best for my online store?",
        a: "WooCommerce suits businesses that want full ownership and no platform fee. Shopify suits brands that want to launch fast with hosting handled. Custom builds suit marketplaces and complex B2B models. We recommend honestly after understanding your plans.",
      },
      {
        q: "Can you build a multi-vendor marketplace?",
        a: "Yes. We build marketplaces with seller registration, dashboards, commissions, split payouts, product approval and multi-pickup shipping.",
      },
      {
        q: "Do you build mobile apps for online stores?",
        a: "Yes. We build Android and iOS shopping apps connected to your store, with push notifications, wishlists and quick checkout.",
      },
      {
        q: "How long does it take to build an eCommerce website?",
        a: "A standard store usually goes live in 2 to 4 weeks. Marketplaces, B2B portals and apps take longer depending on features. You get a written timeline before we start.",
      },
      {
        q: "Can you connect my store to Tally, ERP or CRM?",
        a: "Yes. We integrate orders, stock, customers and invoices with Tally, popular ERPs and CRMs, so your team doesn't copy data by hand.",
      },
      {
        q: "Will my store generate GST invoices?",
        a: "Yes. We set up automatic GST-compliant invoices with your GSTIN, HSN codes and the correct CGST, SGST or IGST split.",
      },
      {
        q: "Do you provide hosting, domain and maintenance?",
        a: "We can arrange hosting and a domain, or use your existing ones. Every package includes free support after launch, and ongoing care plans are available.",
      },
    ],
    STORE_TYPES,
  },
};
