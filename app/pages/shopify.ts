import { PROOF, STORE_TYPES } from "../content";
import type { Page } from "./types";

export const SHOPIFY: Page = {
  key: "shopify",
  path: "/shopify-development",
  theme: "theme-shopify",
  platform: "Shopify",
  label: "Shopify development",
  seo: {
    title: "Shopify Website Development Company in India | RannLab",
    description:
      "RannLab designs and builds high-converting Shopify stores in India — custom themes, Razorpay & COD, GST, Shiprocket and the right apps set up. Free quote in 24 hours.",
    ogImage: "/og-shopify.png",
    ogAlt: "Shopify website development in India by RannLab Technologies",
    serviceName: "Shopify Website Development",
  },
  h1: "Shopify Website Development Company in",
  heroSub:
    "Fill a 30-second form or message us on WhatsApp. We design, build and launch your Shopify store with Razorpay, COD, GST, Shiprocket and only the apps you need, so you can focus on the orders.",
  needs: ["New Shopify store", "Migrate my store to Shopify", "Shopify theme customisation", "Speed / conversion fixes", "Apps & integrations", "Not sure yet"],
  story: {
    brandA: "Kavya",
    brandB: "Studio",
    domain: "kavyastudio.in",
    banner: "/showcase/cat-fashion.webp",
    bannerSmall: "/showcase/cat-fashion-240.webp",
    bannerTitle: "The festive edit",
    bannerSub: "Easy returns · COD available",
    products: [
      { img: "/showcase/kurta.webp", name: "Chanderi kurta", price: "₹2,449" },
      { img: "/showcase/cat-fashion-240.webp", name: "Festive suit set", price: "₹3,199" },
      { img: "/showcase/cat-beauty-240.webp", name: "Glow care kit", price: "₹899" },
      { img: "/showcase/bangles.webp", name: "Lac bangles", price: "₹699" },
    ],
    orders: [
      { img: "/showcase/kurta.webp", t: "New order · ₹2,449", d: "Paid via UPI" },
      { img: "/showcase/cat-fashion-240.webp", t: "New order · ₹3,199", d: "Cash on delivery" },
      { img: "/showcase/cat-beauty-240.webp", t: "Shipped · ₹899", d: "Courier pickup booked" },
    ],
    formSell: "Ethnic wear · 120 products",
  },
  copy: {
    painsSub: "These are the problems we hear most from Indian brands on Shopify, and exactly what our Shopify builds are designed to fix.",
    featuresSub: "Every Shopify store we launch is set up for the way Indian customers pay, ship and shop.",
    featureFaces: ["UPI, cards & COD", "Shipping", "GST setup", "WhatsApp alerts", "Fast theme", "SEO & tracking"],
    quoteSub: "No sales pressure. A RannLab Shopify expert reviews your needs and sends a clear, itemised plan with price and timeline.",
    svcEyebrow: "Our Shopify services",
    svcTitle: "From a first Shopify store to a full redesign",
    migrateFrom: ["WooCommerce", "Wix", "Magento", "OpenCart"],
    migrateTo: "Shopify",
    careChips: ["Theme updated", "Apps reviewed", "Speed checked"],
    processTitle: "Your Shopify store live in about 4 weeks",
    vsTag: "Your Shopify partner",
    whyBody: "has spent 10+ years building web, mobile and custom software for businesses worldwide. Your Shopify store gets the same engineering standards.",
    faqTitle: "Shopify development: common questions",
    chatQ: "Hi! How much will a Shopify store cost for my brand?",
    chatQ2: "Can you set up Razorpay and COD on Shopify?",
    chatA2: "Yes. Razorpay or PayU, COD rules, GST settings and Shiprocket, all ready at launch.",
    ctaTitle: "Let's build your Shopify store.",
    ctaSub: "Talk to a RannLab Shopify expert today. Free consultation, fixed quote within 24 hours.",
    ctaOrder: "₹3,199 · Ananya R., Jaipur",
  },
  c: {
    PLATFORMS: ["Shopify", "Razorpay", "PayU", "Cashfree", "Shiprocket", "WhatsApp", "Google Analytics 4", "Meta Pixel"],
    PAINS: [
      {
        title: "A ready-made theme that looks like everyone else",
        body: "Default themes, stock banners and cluttered product pages make a brand forgettable, and visitors leave without buying.",
        fix: "A custom-designed Shopify theme built around your brand, with clear product pages, trust badges and a short checkout.",
      },
      {
        title: "Too many apps, slow store, rising bills",
        body: "Every problem gets another app. Pages slow down, scripts clash and monthly app costs keep climbing.",
        fix: "We set up only the apps you really need and build the rest into the theme, so the store stays fast and costs stay low.",
      },
      {
        title: "Indian payments, COD and GST never set up right",
        body: "Failed UPI payments, no COD rules, wrong tax settings and manual invoices waste hours every week.",
        fix: "Razorpay or PayU, COD with pincode and order-value rules, GST settings and invoices, all configured and tested before launch.",
      },
    ],
    FEATURES: [
      { icon: "card", title: "Indian payments on Shopify", body: "UPI, cards, net banking and wallets through Razorpay, PayU or Cashfree, plus COD with pincode and order-value rules." },
      { icon: "truck", title: "Shipping on autopilot", body: "Shiprocket or Delhivery connected to Shopify, with live serviceability checks and tracking updates for buyers." },
      { icon: "receipt", title: "GST set up correctly", body: "Tax settings for your GSTIN and states, plus GST-compliant invoices your customers can download." },
      { icon: "chat", title: "WhatsApp order alerts", body: "Order, shipping and abandoned-cart messages on WhatsApp, where Indian buyers actually reply." },
      { icon: "bolt", title: "A fast, custom theme", body: "A lightweight theme, optimised images and fewer apps, so pages load quickly even on budget Android phones." },
      { icon: "search", title: "SEO & tracking from day one", body: "Clean URLs, product schema, sitemap, Search Console, GA4 and Meta Pixel set up before launch." },
    ],
    SERVICES: [
      { icon: "cart", title: "New Shopify store", body: "Brand-led design, products uploaded, payments, shipping and taxes configured — ready to sell." },
      { icon: "refresh", title: "Migration to Shopify", body: "Move from WooCommerce, Wix, Magento or OpenCart with products, customers, orders and SEO redirects." },
      { icon: "layers", title: "Theme design & customisation", body: "Custom Shopify themes and sections built around how your customers browse and buy." },
      { icon: "bolt", title: "Speed & conversion fixes", body: "Remove app bloat, fix slow pages and improve product pages, cart and checkout flow." },
      { icon: "wrench", title: "Apps & integrations", body: "Subscriptions, B2B pricing, reviews, loyalty, ERP, CRM and Tally connected the right way." },
      { icon: "shield", title: "Care & growth support", body: "Theme updates, app reviews, new landing pages and a real person to call." },
    ],
    PROCESS: [
      { step: "01", title: "Free consultation", time: "Day 1", body: "A 20-minute call about your products, customers and budget. We suggest the right Shopify plan and apps, and send a fixed quote within 24 hours." },
      { step: "02", title: "Design & approval", time: "Week 1", body: "We design your homepage and product page first. Nothing goes into development until you approve it." },
      { step: "03", title: "Build & set up", time: "Weeks 2–3", body: "Theme build, products, payments, COD, GST, shipping and WhatsApp alerts set up and tested on real phones." },
      { step: "04", title: "Launch & handover", time: "Week 4", body: "Go live, connect your domain, submit to Google and train your team on orders — then support continues." },
    ],
    PACKAGES: [
      {
        name: "Shopify Starter",
        forWho: "New brands & small catalogues",
        price: "",
        featured: false,
        items: ["Up to 50 products uploaded", "Premium theme, set up for your brand", "Razorpay / PayU + COD", "GST settings & shipping rates", "Basic on-page SEO", "1 month free support"],
      },
      {
        name: "Shopify Growth",
        forWho: "Growing D2C brands",
        price: "",
        featured: true,
        items: ["Up to 300 products uploaded", "Custom-designed key pages", "Shiprocket + WhatsApp alerts", "Abandoned-cart recovery", "GA4, Meta Pixel & Search Console", "Speed optimisation", "3 months free support"],
      },
      {
        name: "Shopify Custom",
        forWho: "Large catalogues, B2B & Shopify Plus",
        price: "",
        featured: false,
        items: ["Fully custom theme", "Custom apps & integrations", "ERP, CRM or Tally sync", "B2B / wholesale pricing", "Multi-store & international setup", "Dedicated project manager"],
      },
    ],
    COMPARE: {
      cols: ["RannLab", "Typical freelancer", "DIY Shopify setup"],
      rows: [
        { label: "Indian payments, COD & GST set up", v: [true, "Sometimes", "Extra apps"] },
        { label: "Custom theme designed for conversions", v: [true, false, false] },
        { label: "Speed & SEO setup", v: [true, false, "Limited"] },
        { label: "Fixed quote & written timeline", v: [true, false, true] },
        { label: "Support after launch", v: [true, false, "Ticket only"] },
        { label: "Only the apps you need", v: [true, "Sometimes", false] },
        { label: "Store, domain & data in your name", v: [true, "Sometimes", true] },
      ],
    },
    PROOF,
    WHY: [
      { icon: "layers", title: "A full product team, not one freelancer", body: "Designers, Shopify developers, QA and SEO specialists work on your store together, under one project manager." },
      { icon: "shield", title: "Security built in", body: "Secure checkout setup, staff permissions, two-step login and careful app reviews, by a team with ISO 27001 practices." },
      { icon: "chart", title: "Built to grow with you", body: "From your first 50 products to B2B pricing, international stores and custom apps, the same team can take you further." },
      { icon: "chat", title: "Support across time zones", body: "Talk to us on WhatsApp, phone or email. We support clients in India, the USA, UK, Canada and Australia." },
    ],
    FAQS: [
      {
        q: "How much does a Shopify website cost in India?",
        a: "It depends on your products, design and the apps or integrations you need. A theme-based store costs far less than a fully custom Shopify build. Share your requirements and we send a fixed, itemised quote within 24 hours — no hidden charges.",
      },
      {
        q: "Are there monthly charges on Shopify?",
        a: "Yes. Shopify charges a monthly plan fee, and some apps have their own fees. Shopify may also charge a transaction fee when you use a third-party payment gateway, depending on your plan. We help you choose the right plan and keep app costs low.",
      },
      {
        q: "How long does it take to build a Shopify store?",
        a: "Most Shopify stores go live in 2 to 4 weeks. Custom themes, large catalogues or migrations can take longer. You get a written timeline before we start.",
      },
      {
        q: "Should I choose Shopify or WooCommerce?",
        a: "Shopify is quick to launch and easy to run, with hosting and security handled for you, but it has monthly fees. WooCommerce has no platform fee and can be customised for almost anything. We help you choose honestly based on your budget and plans.",
      },
      {
        q: "Which payment gateways work with Shopify in India?",
        a: "Razorpay, PayU, Cashfree, PhonePe and CCAvenue, among others, with UPI, cards, net banking, wallets and Cash on Delivery.",
      },
      {
        q: "Can you set up GST on Shopify?",
        a: "Yes. We configure Shopify's tax settings for your GSTIN and set up GST-compliant invoices that you and your customers can download.",
      },
      {
        q: "Can you move my store to Shopify?",
        a: "Yes. We migrate products, categories, customers and order history from WooCommerce, Wix, Magento, OpenCart and others, and set up redirects so you keep your Google rankings.",
      },
      {
        q: "Will I be able to manage the store myself?",
        a: "Yes. Shopify's admin is easy to use. We train your team to add products, update prices and process orders, and give you a short video guide.",
      },
    ],
    STORE_TYPES,
  },
};
