/** All landing-page copy lives here so it can be edited without touching layout code. */

export const HERO_POINTS = [
  "UPI, Razorpay, PhonePe & Cash on Delivery ready",
  "GST invoices, Shiprocket shipping & WhatsApp order alerts",
  "Mobile-first design built to pass Google Core Web Vitals",
  "You own the store — no monthly platform fees or lock-in",
];

export const PLATFORMS = [
  "WooCommerce",
  "WordPress",
  "Razorpay",
  "PhonePe",
  "Paytm",
  "Shiprocket",
  "Google Analytics 4",
  "Meta Pixel",
];

export const PAINS = [
  {
    title: "Visitors come, but don't buy",
    body: "Slow pages, confusing product pages and a long checkout quietly kill most sales before the customer reaches “Place order”.",
  },
  {
    title: "Payments and COD are a headache",
    body: "Failed UPI payments, no COD rules, fake orders and manual GST invoices eat hours every week.",
  },
  {
    title: "Stuck with a freelancer who vanished",
    body: "Half-built sites, no backups and no one to call when the store breaks during a sale.",
  },
];

export const FEATURES = [
  {
    icon: "card",
    title: "Indian payments, done right",
    body: "UPI, cards, net banking and wallets via Razorpay, PhonePe, Cashfree or PayU — plus COD with pincode and order-value rules.",
  },
  {
    icon: "truck",
    title: "Shipping on autopilot",
    body: "Shiprocket or Delhivery integration, live pincode serviceability check and automatic tracking updates for buyers.",
  },
  {
    icon: "receipt",
    title: "GST-compliant invoices",
    body: "Automatic tax invoices with GSTIN, HSN codes and CGST/SGST/IGST split — downloadable by you and your customer.",
  },
  {
    icon: "chat",
    title: "WhatsApp order alerts",
    body: "Order confirmation, shipping and abandoned-cart reminders on WhatsApp, where Indian buyers actually reply.",
  },
  {
    icon: "bolt",
    title: "Fast on 4G phones",
    body: "Lightweight theme, optimised images, caching and CDN setup so pages load quickly even on budget Android phones.",
  },
  {
    icon: "search",
    title: "SEO & tracking from day one",
    body: "Product schema, clean URLs, sitemap, Google Search Console, GA4 and Meta Pixel installed before launch.",
  },
];

export const SERVICES = [
  { icon: "cart", title: "New WooCommerce store", body: "Custom design, products uploaded, payments and shipping configured — ready to sell." },
  { icon: "refresh", title: "Migration to WooCommerce", body: "Move from Shopify, Wix, Magento or OpenCart with products, customers, orders and SEO rankings intact." },
  { icon: "layers", title: "Redesign & conversion fixes", body: "Rebuild product pages, cart and checkout around how your customers actually shop." },
  { icon: "bolt", title: "Speed optimisation", body: "Fix slow WooCommerce stores: hosting, caching, image and database clean-up, Core Web Vitals." },
  { icon: "wrench", title: "Custom plugins & features", body: "B2B pricing, wholesale, subscriptions, multi-vendor, product configurators and ERP/CRM integrations." },
  { icon: "shield", title: "Care & maintenance", body: "Updates, daily backups, security monitoring, uptime checks and a real person to call." },
];

export const PROCESS = [
  { step: "01", title: "Free consultation", time: "Day 1", body: "A 20-minute call to understand your products, customers and budget. You get a fixed quote within 24 hours." },
  { step: "02", title: "Design & approval", time: "Week 1", body: "We design your homepage and product page first. Nothing goes into development until you approve it." },
  { step: "03", title: "Build & set up", time: "Weeks 2–3", body: "Store development, products, payments, shipping, GST and WhatsApp alerts configured and tested on real phones." },
  { step: "04", title: "Launch & handover", time: "Week 4", body: "Go live, submit to Google, train your team on managing orders — then support continues after launch." },
];

export const PACKAGES = [
  {
    name: "Starter Store",
    forWho: "New brands & small catalogues",
    /** Set a price string like "₹24,999" to display it; leave empty to show “Fixed quote in 24 hrs”. */
    price: "",
    featured: false,
    items: [
      "Up to 50 products uploaded",
      "Mobile-first premium theme",
      "UPI / Razorpay + COD",
      "GST invoices & shipping rates",
      "Basic on-page SEO",
      "1 month free support",
    ],
  },
  {
    name: "Growth Store",
    forWho: "Growing D2C brands",
    price: "",
    featured: true,
    items: [
      "Up to 300 products uploaded",
      "Custom design for key pages",
      "Shiprocket + WhatsApp alerts",
      "Abandoned-cart recovery",
      "GA4, Meta Pixel & Search Console",
      "Core Web Vitals optimisation",
      "3 months free support",
    ],
  },
  {
    name: "Custom / Enterprise",
    forWho: "B2B, multi-vendor & complex stores",
    price: "",
    featured: false,
    items: [
      "Unlimited products & variants",
      "Custom plugins & integrations",
      "ERP, CRM or Tally sync",
      "Wholesale / B2B pricing",
      "Multi-vendor marketplace",
      "Dedicated project manager",
    ],
  },
];

export const COMPARE = {
  cols: ["Midvana", "Typical freelancer", "DIY website builder"],
  rows: [
    { label: "Indian payments, COD & GST set up", v: [true, "Sometimes", "Extra apps"] },
    { label: "Designed for conversions, not just looks", v: [true, false, false] },
    { label: "Core Web Vitals & SEO setup", v: [true, false, "Limited"] },
    { label: "Fixed quote & written timeline", v: [true, false, true] },
    { label: "Support after launch", v: [true, false, "Ticket only"] },
    { label: "You own the code & data", v: [true, true, false] },
    { label: "No monthly platform commission", v: [true, true, false] },
  ] as { label: string; v: (boolean | string)[] }[],
};

/** Genuine Google reviews of Midvana, quoted verbatim (excerpted). Never add or reword reviews. */
export const REVIEWS = [
  {
    name: "Prof. Amisha Dawda",
    text: "He is able to align & shape the brand's vision, mission & objectives into reality. I would highly recommend brands to opt for his services.",
  },
  {
    name: "Jagruti Swargam",
    text: "The overall experience was good. Since the beginning Prashant was very cooperative and helpful and guided in a correct way. The team was able to deliver as expected.",
  },
  {
    name: "Parag Kotecha",
    text: "Absolutely they try level best for making these project better… Professional advisors, Polite nature, 100% Committed Nature.",
  },
];

export const FAQS = [
  {
    q: "How much does a WooCommerce website cost in India?",
    a: "It depends on the number of products, design and integrations you need. A simple store costs far less than a custom B2B or multi-vendor store. Share your requirements and we send a fixed, itemised quote within 24 hours — no hidden charges.",
  },
  {
    q: "How long does it take to build a WooCommerce store?",
    a: "Most stores go live in 2 to 4 weeks. Larger catalogues, migrations or custom features can take 6 to 8 weeks. You get a written timeline before we start.",
  },
  {
    q: "Should I choose WooCommerce or Shopify?",
    a: "WooCommerce has no monthly platform fee or sales commission, you fully own your store and data, and it can be customised for almost any business model. Shopify is quicker to start but costs more every month as you grow. We help you choose honestly based on your budget and plans.",
  },
  {
    q: "Which payment gateways can you integrate?",
    a: "Razorpay, PhonePe, Paytm, Cashfree, PayU, CCAvenue, Stripe and PayPal, along with UPI, cards, net banking, wallets, EMI and Cash on Delivery.",
  },
  {
    q: "Will my store generate GST invoices?",
    a: "Yes. We set up automatic GST-compliant invoices with your GSTIN, HSN codes and the correct CGST, SGST or IGST split based on the buyer's state.",
  },
  {
    q: "Can I manage products and orders myself?",
    a: "Yes. WooCommerce runs on WordPress, which is easy to use. We train your team to add products, update prices and process orders, and give you a short video guide.",
  },
  {
    q: "Can you move my existing store to WooCommerce?",
    a: "Yes. We migrate products, categories, customers and order history from Shopify, Wix, Magento, OpenCart and others, and set up redirects so you keep your Google rankings.",
  },
  {
    q: "Do you provide hosting, domain and maintenance?",
    a: "We can arrange fast hosting and a domain for you, or use your existing ones. Every package includes free support after launch, and ongoing care plans are available.",
  },
];
