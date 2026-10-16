import { SITE, WA_DEFAULT } from "../site";
import { enhance } from "../lib/enhance";
import {
  COMPARE, FAQS, FEATURES, HERO_POINTS, PACKAGES, PAINS, PLATFORMS, PROCESS, PROOF, SERVICES, STORE_TYPES, WHY,
} from "../content";
import { LeadForm } from "./LeadForm";
import * as I from "./icons";

const ICONS: Record<string, (p: { className?: string }) => React.JSX.Element> = {
  card: I.Card, truck: I.Truck, receipt: I.Receipt, chat: I.Chat, bolt: I.Bolt, search: I.Search,
  cart: I.Cart, refresh: I.Refresh, layers: I.Layers, wrench: I.Wrench, shield: I.Shield, mobile: I.Mobile,
  chart: I.Chart,
};
const PROOF_ICONS = [I.Calendar, I.Users, I.Code, I.Award];

/** Accent colours that rotate across cards, steps and stats (brand teal + Indian festive hues). */
const ACCENTS = [
  { tile: "bg-teal-50 text-teal-700 ring-teal-200", bar: "from-teal-300 via-teal-500 to-teal-700", glow: "rgb(31 165 156 / 0.35)", solid: "bg-teal-600", text: "text-teal-300" },
  { tile: "bg-amber-50 text-amber-700 ring-amber-200", bar: "from-amber-300 via-orange-400 to-orange-600", glow: "rgb(245 158 11 / 0.35)", solid: "bg-amber-500", text: "text-amber-300" },
  { tile: "bg-violet-50 text-violet-700 ring-violet-200", bar: "from-violet-300 via-violet-500 to-fuchsia-600", glow: "rgb(139 92 246 / 0.35)", solid: "bg-violet-600", text: "text-violet-300" },
  { tile: "bg-rose-50 text-rose-700 ring-rose-200", bar: "from-rose-300 via-rose-500 to-pink-600", glow: "rgb(244 63 94 / 0.32)", solid: "bg-rose-600", text: "text-rose-300" },
  { tile: "bg-sky-50 text-sky-700 ring-sky-200", bar: "from-sky-300 via-sky-500 to-blue-600", glow: "rgb(14 165 233 / 0.33)", solid: "bg-sky-600", text: "text-sky-300" },
  { tile: "bg-lime-50 text-lime-800 ring-lime-200", bar: "from-lime-300 via-lime-500 to-green-600", glow: "rgb(101 163 13 / 0.33)", solid: "bg-lime-600", text: "text-lime-300" },
];
const acc = (i: number) => ACCENTS[i % ACCENTS.length];

/**
 * Official platform logos, if present: put files in app/assets/platform-logos/ named by slug
 * (woocommerce, wordpress, razorpay, phonepe, paytm, shiprocket, google-analytics-4, meta-pixel)
 * as .svg, .png or .webp. Any platform without a file falls back to the icon below.
 */
const LOGO_FILES = import.meta.glob<string>("../assets/platform-logos/*.{svg,png,webp}", { eager: true, query: "?url", import: "default" });
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const logoFor = (name: string) => {
  const key = Object.keys(LOGO_FILES).find((k) => k.split("/").pop()!.replace(/\.[a-z]+$/, "") === slug(name));
  return key ? LOGO_FILES[key] : undefined;
};

/** Icons that show what each platform does (used until a logo file is added). */
const PLATFORM_ICONS: Record<string, (p: { className?: string }) => React.JSX.Element> = {
  WooCommerce: I.Cart,
  WordPress: I.Layout,
  Razorpay: I.Card,
  PhonePe: I.Mobile,
  Paytm: I.Wallet,
  Shiprocket: I.Truck,
  "Google Analytics 4": I.Chart,
  "Meta Pixel": I.Target,
};

const NAV = [
  ["#features", "Features"],
  ["#services", "Services"],
  ["#process", "Process"],
  ["#packages", "Packages"],
  ["#faq", "FAQ"],
] as const;

/* ---------- Shared bits ---------- */

function WaButton({ location, className = "", label = "Chat on WhatsApp" }: { location: string; className?: string; label?: string }) {
  return (
    <a href={WA_DEFAULT} target="_blank" rel="noopener" data-track="whatsapp_click" data-loc={location} className={`btn btn-wa ${className}`}>
      <I.WhatsApp /> {label}
    </a>
  );
}

const TONES = {
  teal: "text-teal-700",
  amber: "text-amber-700",
  violet: "text-violet-700",
  rose: "text-rose-700",
  sky: "text-sky-700",
} as const;

function SectionHead({ eyebrow, title, sub, id, dark = false, tone = "teal" }: { eyebrow: string; title: string; sub?: string; id: string; dark?: boolean; tone?: keyof typeof TONES }) {
  return (
    <div className="reveal mx-auto max-w-2xl text-center">
      <p className={`eyebrow ${dark ? "eyebrow-dark" : TONES[tone]}`}>{eyebrow}</p>
      <h2 id={id} className={`mt-3 text-3xl font-bold sm:text-4xl ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {sub && <p className={`mt-4 text-lg ${dark ? "text-white/75" : "text-muted"}`}>{sub}</p>}
    </div>
  );
}

/** Decorative circuit traces, echoing the circuit-board "A" in the RannLab logo. */
function Circuit({ className = "" }: { className?: string }) {
  const paths = [
    "M0 60h180l40 40h160l30-30h190",
    "M0 140h120l40 40h220l60 60h160",
    "M60 400V300l40-40h140l40-40h320",
    "M320 0v80l40 40v120l-40 40v120",
    "M460 0v60l-40 40",
  ];
  return (
    <svg className={`circuit ${className}`} viewBox="0 0 600 400" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
      {paths.map((d) => <path key={d} d={d} />)}
      {/* Data pulses travelling along the traces */}
      {paths.slice(0, 4).map((d, i) => (
        <path key={`p-${d}`} d={d} className="pulse" style={{ animationDelay: `${i * 1.3}s` }} pathLength={100} />
      ))}
      {[[180, 60], [380, 100], [410, 70], [160, 180], [380, 180], [440, 240], [100, 260], [280, 220], [360, 120], [360, 240], [420, 100], [320, 80]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="var(--color-night)" />
      ))}
    </svg>
  );
}

/* ---------- Header ---------- */

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <a href="#top" className="shrink-0">
          <img src="/brand/rannlab-logo-200.webp" srcSet="/brand/rannlab-logo-200.webp 200w, /brand/rannlab-logo.webp 398w" sizes="170px" alt="RannLab Technologies" width={170} height={34} className="h-[30px] w-auto sm:h-[34px]" />
        </a>
        <nav aria-label="Page sections" className="hidden lg:block">
          <ul className="flex gap-8 text-[0.95rem] font-semibold text-ink-2">
            {NAV.map(([href, label]) => (
              <li key={href}><a className="transition-colors hover:text-teal-700" href={href}>{label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <a href={`tel:${SITE.phoneE164}`} data-track="call_click" data-loc="header" className="hidden items-center gap-2 px-1 py-2 font-semibold text-ink md:inline-flex">
            <span className="grid size-8 place-items-center rounded-full bg-teal-50 text-teal-700"><I.Phone className="size-4" /></span>
            {SITE.phoneDisplay}
          </a>
          <a href="#quote" data-track="cta_click" data-loc="header" className="btn btn-primary btn-sm">Free quote</a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero visual: 3D product ring over a live dot-wave ---------- */

/*
 * Product photos: Unsplash License (free for commercial use, no attribution required).
 * "Kalaa Ghar" style products are made-up examples of what a client's store sells.
 */
const RING = [
  { img: "/showcase/kurta.webp", name: "Chanderi Silk Kurta", was: "₹3,499", now: "₹2,449", tag: "Sale", tone: "#e2581c" },
  { img: "/showcase/bangles.webp", name: "Hand-painted Lac Bangles", was: "₹899", now: "₹699", tag: "Bestseller", tone: "#0b6e6a" },
  { img: "/showcase/earrings.webp", name: "Carved Wooden Jhumkas", was: "", now: "₹449", tag: "New", tone: "#7c3aed" },
  { img: "/showcase/cat-spices-240.webp", name: "Organic Masala Box", was: "", now: "₹549", tag: "Organic", tone: "#4d7c0f" },
  { img: "/showcase/cat-decor-240.webp", name: "Painted Terracotta Vase", was: "₹1,599", now: "₹1,299", tag: "Sale", tone: "#e2581c" },
  { img: "/showcase/necklace.webp", name: "Tribal Bead Necklace", was: "", now: "₹1,199", tag: "Handmade", tone: "#be123c" },
  { img: "/showcase/cat-beauty-240.webp", name: "Glow Skincare Kit", was: "", now: "₹899", tag: "Bundle", tone: "#0369a1" },
  { img: "/showcase/cat-handicrafts-240.webp", name: "Festive Gift Hamper", was: "₹1,499", now: "₹999", tag: "Diwali", tone: "#b45309" },
];

function ProductRing() {
  const step = 360 / RING.length;
  return (
    <div className="ring-stage relative mx-auto w-full max-w-[36rem]" aria-hidden="true" data-ring>
      <div className="ring-tilt">
        <div className="ring-spin">
          {RING.map((p, i) => (
            <div key={p.name} className="ring-card" style={{ "--a": `${i * step}deg` } as React.CSSProperties}>
              <div className="ring-face">
                <div className="relative">
                  <img src={p.img} alt="" width={240} height={240} decoding="async" className="aspect-square w-full rounded-lg object-cover" />
                  <span className="absolute left-1.5 top-1.5 rounded-full px-2 py-0.5 text-[9px] font-bold text-white" style={{ background: p.tone }}>{p.tag}</span>
                </div>
                <p className="mt-2 truncate text-[11px] font-bold text-ink">{p.name}</p>
                <p className="text-[11px]">
                  {p.was && <del className="mr-1 text-[#9aa5a8]">{p.was}</del>}
                  <b className="text-[#c2410c]">{p.now}</b>
                </p>
                <span className="mt-1.5 block rounded-md bg-ink py-1 text-center text-[10px] font-bold text-white">Add to cart</span>
              </div>
              <div className="ring-back"><img src={p.img} alt="" width={240} height={240} decoding="async" className="h-full w-full rounded-xl object-cover" /></div>
            </div>
          ))}
        </div>
        <div className="ring-floor" />
      </div>

      {/* Floating proof chips at different depths */}
      <div className="chip chip-a">
        <span className="grid size-8 place-items-center rounded-full bg-[#c6e1c6] text-[#2c4a1f]"><I.Cart className="size-4" /></span>
        <span className="text-[11px] leading-tight">
          <b className="block text-[12px] text-ink">New order #4821 · ₹3,148</b>
          <span className="text-muted">Priya S., Pune · </span><span className="rounded bg-[#c6e1c6] px-1 font-semibold text-[#2c4a1f]">Processing</span>
        </span>
      </div>
      <div className="chip chip-b">
        <span className="grid size-8 place-items-center rounded-full bg-teal-50 text-teal-700"><I.Check className="size-4" /></span>
        <span className="text-[11px] leading-tight"><b className="block text-[12px] text-ink">Paid ₹2,449 via UPI</b><span className="text-muted">GST invoice sent</span></span>
      </div>
      <div className="chip chip-c">
        <span className="text-[13px] font-bold text-[#d4a017]">★ 4.9</span>
        <span className="text-[11px] leading-tight text-muted">from 380+<br />customer reviews</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="band-dark hero" data-hero>
      <canvas className="dot-wave" data-wave aria-hidden="true" />
      <div className="ghost-word" aria-hidden="true">ONLINE</div>
      <div className="orb orb-teal" aria-hidden="true" />
      <div className="orb orb-amber" aria-hidden="true" />
      <div className="orb orb-violet" aria-hidden="true" />
      <Circuit className="-left-40 bottom-0 w-[30rem] opacity-60" />
      <div className="container-x grid gap-10 pb-14 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:pb-24 lg:pt-14">
        <div>
          <nav aria-label="Breadcrumb" className="text-sm text-white/70">
            <ol className="flex flex-wrap gap-1.5">
              <li><a className="underline-offset-2 hover:text-white hover:underline" href={SITE.mainSite}>Home</a> <span aria-hidden="true">/</span></li>
              <li><a className="underline-offset-2 hover:text-white hover:underline" href={SITE.links.services}>Services</a> <span aria-hidden="true">/</span></li>
              <li aria-current="page" className="text-white/90">WooCommerce Development</li>
            </ol>
          </nav>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-500/15 px-3 py-1 text-sm font-semibold text-teal-100 ring-1 ring-teal-300/30">
            <span className="size-2 rounded-full bg-teal-300" aria-hidden="true" /> 10+ years · 100+ projects delivered
          </p>
          <h1 id="hero-title" className="mt-5 text-[2.35rem] font-bold leading-[1.12] sm:text-5xl lg:text-[3.35rem]">
            WooCommerce Website Development Company in <span className="tricolour">India</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85 sm:text-xl">
            RannLab builds fast, mobile-first online stores that turn visitors into paying customers, with Indian payments, shipping and GST ready from day one.
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {HERO_POINTS.map((p) => (
              <li key={p} className="flex gap-2.5 text-[0.97rem] text-white/90">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-teal-500/20 text-teal-300"><I.Check className="size-3.5" /></span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#quote" data-track="cta_click" data-loc="hero" className="btn btn-primary text-lg">Get a free quote <I.Arrow /></a>
            <WaButton location="hero" className="text-lg" />
          </div>
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5"><I.Shield className="size-4 text-teal-300" /> ISO 27001 certified</span>
            <span>Fixed price</span>
            <span>You own your store</span>
          </p>
        </div>
        <ProductRing />
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section aria-label={`${SITE.shortBrand} at a glance`} className="border-b border-line bg-white">
      <div className="container-x py-10">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {PROOF.map((p, i) => {
            const Icon = PROOF_ICONS[i];
            return (
              <li key={p.label} className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                <span className={`grid size-12 shrink-0 place-items-center rounded-xl ring-1 ${acc(i).tile}`}><Icon /></span>
                <span>
                  <span className="block whitespace-nowrap font-display text-2xl font-bold text-ink sm:text-3xl" data-count={/^\d+/.test(p.value) ? p.value : undefined}>{p.value}</span>
                  <span className="block text-sm text-muted">{p.label}</span>
                </span>
              </li>
            );
          })}
        </ul>
        <div className="mt-9 flex flex-col items-center gap-4 border-t border-line pt-7 lg:flex-row lg:gap-8">
          <p className="shrink-0 text-sm font-semibold uppercase tracking-[0.14em] text-muted lg:whitespace-nowrap">Platforms & tools we set up</p>
          {/* One-line slider: the first list is read by screen readers, the copy only fills the loop */}
          <div className="logo-slider w-full min-w-0 flex-1">
            <div className="logo-track">
              {[0, 1].map((copy) => (
                <ul key={copy} className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={copy === 1 ? true : undefined}>
                  {PLATFORMS.map((p, i) => {
                    const Icon = PLATFORM_ICONS[p] ?? I.Layers;
                    const logo = logoFor(p);
                    return (
                      <li key={p} className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white py-1.5 pl-1.5 pr-4 text-sm font-semibold text-ink-2 shadow-sm ring-1 ring-line">
                        {logo ? (
                          <span className="grid size-7 place-items-center rounded-full bg-white ring-1 ring-line"><img src={logo} alt="" width={20} height={20} loading="lazy" decoding="async" className="size-5 object-contain" /></span>
                        ) : (
                          <span className={`grid size-7 place-items-center rounded-full ring-1 ${acc(i).tile}`}><Icon className="size-4" /></span>
                        )}
                        {p}
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pains() {
  return (
    <section aria-labelledby="pains-title" className="bg-white py-16 sm:py-24">
      <div className="container-x">
        <SectionHead
          id="pains-title"
          tone="rose"
          eyebrow="Why most online stores don't sell"
          title="A good-looking website is not the same as a store that sells"
          sub="These are the problems we hear most from Indian business owners, and exactly what our WooCommerce builds are designed to fix."
        />
        <p className="reveal mt-4 text-center text-sm font-semibold text-muted">Hover or tap a card to see how we fix it</p>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {PAINS.map((p, i) => (
            <li key={p.title} className="flip reveal" tabIndex={0} style={{ animationDelay: `${i * 90}ms` }}>
              <div className="flip-inner">
                <div className={`flip-face rounded-2xl p-6 ring-1 ${["bg-rose-50 ring-rose-100", "bg-amber-50 ring-amber-100", "bg-violet-50 ring-violet-100"][i]}`}>
                  <span className={`grid size-10 place-items-center rounded-full bg-white ring-1 ${["text-rose-600 ring-rose-200", "text-amber-700 ring-amber-200", "text-violet-600 ring-violet-200"][i]}`}><I.Cross /></span>
                  <h3 className="mt-4 text-lg font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-muted">{p.body}</p>
                  <p className={`mt-4 inline-flex items-center gap-1.5 text-sm font-bold ${["text-rose-700", "text-amber-800", "text-violet-700"][i]}`}>See the fix <I.Refresh className="size-4" /></p>
                </div>
                <div className="flip-face flip-back rounded-2xl bg-gradient-to-br from-teal-700 to-night p-6 text-white ring-1 ring-teal-500/40">
                  <span className="grid size-10 place-items-center rounded-full bg-white/15 text-teal-200 ring-1 ring-white/25"><I.Check /></span>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-teal-200">How RannLab fixes it</p>
                  <p className="mt-2 text-[1.02rem] leading-relaxed text-white/95">{p.fix}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TypeCard({ t, i }: { t: (typeof STORE_TYPES)[number]; i: number }) {
  return (
    <div className="type-card relative w-40 shrink-0 overflow-hidden rounded-2xl bg-surface shadow-xl sm:w-48">
      <img src={t.img} srcSet={`${t.img.replace(".webp", "-240.webp")} 240w, ${t.img} 400w`} sizes="192px" alt="" width={400} height={500} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent" />
      <span className={`absolute left-3 top-3 h-1.5 w-8 rounded-full bg-gradient-to-r ${acc(i).bar}`} />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="font-display text-[0.95rem] font-bold leading-snug text-white">{t.title}</p>
        <p className="mt-1 text-xs leading-snug text-white/85">{t.detail}</p>
      </div>
    </div>
  );
}

function StoreTypes() {
  const half = Math.ceil(STORE_TYPES.length / 2);
  const rows = [STORE_TYPES.slice(0, half), STORE_TYPES.slice(half)];
  return (
    <section aria-labelledby="types-title" className="overflow-hidden bg-gradient-to-b from-white via-amber-50/70 to-white pb-20 sm:pb-28">
      <div className="container-x">
        <div className="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-amber-700">Stores we build</p>
            <h2 id="types-title" className="mt-3 text-3xl font-bold text-ink sm:text-4xl">Set up for what you sell</h2>
            <p className="mt-4 text-lg text-muted">Every category sells differently. We set up the product pages, shipping rules and checkout your customers expect.</p>
          </div>
          <a href="#quote" data-track="cta_click" data-loc="store-types" className="inline-flex items-center gap-2 font-bold text-teal-700 underline-offset-4 hover:underline">
            Tell us what you sell <I.Arrow className="size-4" />
          </a>
        </div>
        {/* Accessible list for screen readers; the 3D wall below is decorative */}
        <ul className="sr-only">
          {STORE_TYPES.map((t) => <li key={t.title}><h3>{t.title}</h3><p>{t.detail}</p></li>)}
        </ul>
      </div>
      <div className="marquee-wall mt-12" aria-hidden="true">
        {rows.map((row, r) => (
          <div key={r} className={`marquee-row ${r ? "marquee-rev" : ""}`}>
            <div className="marquee-track">
              {[...row, ...row, ...row, ...row].map((t, i) => <TypeCard key={`${t.title}-${i}`} t={t} i={STORE_TYPES.indexOf(t)} />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function IconCards({ items, offset = 0 }: { items: readonly { icon: string; title: string; body: string }[]; offset?: number }) {
  return (
    <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f, i) => {
        const Icon = ICONS[f.icon];
        return (
          <li key={f.title} className="card tilt reveal" data-tilt3d style={{ animationDelay: `${(i % 3) * 90}ms`, "--glow": acc(i + offset).glow } as React.CSSProperties}>
            <span className={`absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r ${acc(i + offset).bar}`} aria-hidden="true" />
            <span className={`pop cube grid size-12 place-items-center rounded-xl ring-1 ${acc(i + offset).tile}`} style={{ "--cube": acc(i + offset).glow } as React.CSSProperties}><Icon /></span>
            <h3 className="mt-5 text-lg font-bold text-ink">{f.title}</h3>
            <p className="mt-2 text-muted">{f.body}</p>
          </li>
        );
      })}
    </ul>
  );
}

function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="mesh-warm scroll-mt-20 py-16 sm:py-24">
      <div className="container-x">
        <SectionHead
          id="features-title"
          tone="amber"
          eyebrow="Built for India"
          title="Everything your store needs to sell from day one"
          sub="Every store we launch comes with the payments, shipping, tax and tracking Indian e-commerce businesses rely on."
        />
        <IconCards items={FEATURES} />
      </div>
    </section>
  );
}

function QuoteBlock() {
  return (
    <section id="quote" aria-labelledby="quote-title" className="scroll-mt-20 bg-white py-16 sm:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_minmax(0,30rem)] lg:items-center lg:gap-16">
        <div>
          <p className="eyebrow">Free quote</p>
          <h2 id="quote-title" className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            Tell us about your store. Get a fixed quote in 24 hours.
          </h2>
          <p className="mt-4 text-lg text-muted">
            No sales pressure. A RannLab WooCommerce expert reviews your needs and sends a clear, itemised plan with price and timeline.
          </p>
          <ul className="mt-6 space-y-3 text-ink-2">
            {["Free 20-minute strategy call", "Itemised quote with no hidden charges", "Design approval before development starts", "Support continues after launch"].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-700"><I.Check className="size-3.5" /></span> {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a href={`tel:${SITE.phoneE164}`} data-track="call_click" data-loc="quote-section" className="flex items-center gap-3 rounded-xl bg-surface p-4 ring-1 ring-line transition hover:ring-teal-300">
              <span className="grid size-10 place-items-center rounded-lg bg-white text-teal-700 ring-1 ring-line"><I.Phone /></span>
              <span className="text-sm leading-tight"><span className="block text-muted">Call us</span><b className="text-base text-ink">{SITE.phoneDisplay}</b></span>
            </a>
            <a href={`mailto:${SITE.email}`} data-track="email_click" data-loc="quote-section" className="flex items-center gap-3 rounded-xl bg-surface p-4 ring-1 ring-line transition hover:ring-teal-300">
              <span className="grid size-10 place-items-center rounded-lg bg-white text-teal-700 ring-1 ring-line"><I.Mail /></span>
              <span className="text-sm leading-tight"><span className="block text-muted">Email us</span><b className="text-base text-ink">{SITE.email}</b></span>
            </a>
          </div>
        </div>
        <div className="form-stack" data-formstack>
          <div className="form-layer form-layer-1" aria-hidden="true" />
          <div className="form-layer form-layer-2" aria-hidden="true" />
          <div className="form-card"><LeadForm id="quote-form" /></div>
        </div>
      </div>
    </section>
  );
}

/** Small animated scenes for each service tile (decorative, CSS only). Keyed by the service icon. */
const SVC_SCENES: Record<string, () => React.JSX.Element> = {
  cart: () => (
    <div className="sc sc-store">
      <div className="sc-browser">
        <div className="sc-bar"><i /><i /><i /><span>yourstore.in</span></div>
        <div className="sc-grid">
          {["from-rose-300 to-orange-300", "from-teal-300 to-sky-300", "from-violet-300 to-fuchsia-300", "from-amber-200 to-lime-300"].map((g, n) => (
            <div key={g} className="sc-prod" style={{ "--d": n } as React.CSSProperties}>
              <b className={`bg-gradient-to-br ${g}`} /><s /><s className="w-1/2" />
              <em>{["₹1,299", "₹849", "₹2,199", "₹599"][n]}</em>
            </div>
          ))}
        </div>
      </div>
      <div className="sc-toast"><I.Check className="size-3.5" /> New order · ₹1,299</div>
    </div>
  ),
  refresh: () => (
    <div className="sc sc-migrate">
      <ul>{["Shopify", "Wix", "Magento", "OpenCart"].map((n, k) => <li key={n} style={{ "--d": k } as React.CSSProperties}>{n}</li>)}</ul>
      <div className="sc-pipe">{[0, 1, 2].map((k) => <i key={k} style={{ "--d": k } as React.CSSProperties} />)}</div>
      <div className="sc-woo"><I.Cart className="size-5" /><b>WooCommerce</b><span><I.Check className="size-3" /> Data intact</span></div>
    </div>
  ),
  layers: () => (
    <div className="sc sc-redesign">
      <div className="sc-page sc-old"><b /><s /><s /><s className="w-2/3" /></div>
      <div className="sc-page sc-new"><b /><s /><s className="w-2/3" /><em>Buy now</em></div>
      <span className="sc-handle" />
      <span className="sc-tag left-3">Before</span>
      <span className="sc-tag right-3 sc-tag-new">After</span>
    </div>
  ),
  bolt: () => (
    <div className="sc sc-speed">
      <div className="sc-gauge"><i className="sc-needle" /><span className="sc-hub" /></div>
      <span className="sc-pill"><I.Bolt className="size-3.5" /> Core Web Vitals · Good</span>
    </div>
  ),
  wrench: () => (
    <div className="sc sc-plugins">
      {["B2B pricing", "Subscriptions", "ERP sync"].map((n, k) => (
        <div key={n} className="sc-tog" style={{ "--d": k } as React.CSSProperties}><span>{n}</span><i /></div>
      ))}
    </div>
  ),
  shield: () => (
    <div className="sc sc-care">
      <svg viewBox="0 0 320 64" fill="none" aria-hidden="true" focusable="false">
        <polyline className="base" points="0,34 70,34 84,12 98,54 112,34 186,34 200,16 214,50 228,34 320,34" />
        <polyline points="0,34 70,34 84,12 98,54 112,34 186,34 200,16 214,50 228,34 320,34" />
      </svg>
      <div className="sc-chips">
        {["Daily backup", "SSL active", "Plugins updated"].map((c) => <span key={c}><I.Check className="size-3" /> {c}</span>)}
      </div>
    </div>
  ),
};
const SVC_TINTS = [
  "from-teal-50 via-cyan-50 to-sky-100",
  "from-amber-50 via-orange-50 to-rose-100",
  "from-violet-50 via-fuchsia-50 to-pink-100",
  "from-lime-50 via-emerald-50 to-teal-100",
  "from-sky-50 via-indigo-50 to-violet-100",
  "from-rose-50 via-pink-50 to-orange-100",
];
const SVC_SPAN = ["md:col-span-2", "", "", "", "", "md:col-span-2"];

function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="svc-band scroll-mt-20 py-16 sm:py-24">
      <div className="container-x">
        <SectionHead id="services-title" tone="violet" eyebrow="Our WooCommerce services" title="From a brand-new store to a complete rebuild" sub="Whatever stage your store is at, one team handles it end to end." />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((sv, i) => {
            const Icon = ICONS[sv.icon];
            const Scene = SVC_SCENES[sv.icon];
            return (
              <li key={sv.title} className={`svc tilt reveal ${SVC_SPAN[i]}`} data-tilt3d style={{ "--glow": acc(i).glow, animationDelay: `${(i % 3) * 90}ms` } as React.CSSProperties}>
                <div className={`svc-vis bg-gradient-to-br ${SVC_TINTS[i]}`} aria-hidden="true">{Scene && <Scene />}</div>
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <span className={`grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white ${acc(i).bar}`}><Icon className="size-5" /></span>
                    <h3 className="text-lg font-bold text-ink">{sv.title}</h3>
                  </div>
                  <p className="mt-3 text-muted">{sv.body}</p>
                </div>
              </li>
            );
          })}
          <li className="svc-cta reveal md:col-span-2 lg:col-span-1">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-300">Not sure where to start?</p>
            <h3 className="mt-3 font-display text-2xl font-bold text-white">Tell us about your store. We'll suggest the right fix.</h3>
            <p className="mt-3 text-white/75">A free 20-minute call, then a fixed, itemised quote within 24 hours.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#quote" data-track="cta_click" data-loc="services" className="btn bg-white text-night hover:bg-teal-50">Discuss my project <I.Arrow className="size-4" /></a>
              <a href={WA_DEFAULT} data-track="whatsapp_click" data-loc="services" className="btn bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/15" rel="noopener" target="_blank"><I.WhatsApp className="size-5" /> WhatsApp</a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="band-dark scroll-mt-20 py-16 sm:py-24">
      <Circuit className="-right-32 -top-10 w-[34rem] opacity-70" />
      <div className="container-x">
        <SectionHead dark id="process-title" eyebrow="How it works" title="Your store live in about 4 weeks" sub="A simple, transparent process with your approval at every step." />
        <ol className="stairs relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <span className="absolute left-0 right-0 top-6 hidden h-0.5 bg-gradient-to-r from-teal-400/0 via-amber-400/70 to-rose-400/0 lg:block" aria-hidden="true" />
          {PROCESS.map((p, i) => (
            <li key={p.step} className={`stair stair-${i} tilt reveal relative rounded-2xl bg-night-2 p-6 ring-1 ring-white/10`} data-tilt3d style={{ "--glow": [acc(0), acc(1), acc(2), acc(3)][i].glow } as React.CSSProperties}>
              <span className={`absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r ${[acc(0), acc(1), acc(2), acc(3)][i].bar}`} aria-hidden="true" />
              <div className="flex items-center justify-between">
                <span className={`pop step-num grid size-12 place-items-center rounded-xl bg-gradient-to-br font-display text-lg font-bold text-white ring-4 ring-night ${[acc(0), acc(1), acc(2), acc(3)][i].bar}`}>{p.step}</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">{p.time}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">{p.title}</h3>
              <p className="mt-2 text-white/75">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Per-tier look for the package picker (index matches PACKAGES). */
const TIERS = [
  { c: "#0f9d94", grad: "from-teal-400 to-emerald-600", btn: "from-teal-600 to-emerald-700", level: "Level 01", slabs: ["Launch"] },
  { c: "#f97316", grad: "from-amber-400 to-rose-500", btn: "from-orange-600 to-rose-600", level: "Level 02", slabs: ["Launch", "Grow"] },
  { c: "#7c3aed", grad: "from-violet-500 to-sky-500", btn: "from-violet-600 to-blue-600", level: "Level 03", slabs: ["Launch", "Grow", "Scale"] },
];

function Packages() {
  return (
    <section id="packages" aria-labelledby="packages-title" className="pk-band scroll-mt-20 py-16 sm:py-24">
      <div className="container-x">
        <SectionHead
          id="packages-title"
          tone="sky"
          eyebrow="Packages"
          title="Choose a starting point. We tailor the rest."
          sub="Every package is a fixed-price project. Pick a level to see what's inside, then get an exact quote within 24 hours."
        />
        <div className="pk mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-10">
          <fieldset className="pk-tiers reveal">
            <legend className="sr-only">Choose a package</legend>
            {PACKAGES.map((p, i) => (
              <label key={p.name} className="pk-tier" style={{ "--c": TIERS[i].c } as React.CSSProperties}>
                <input type="radio" name="pkg" id={`pkg-${i}`} value={p.name} defaultChecked={p.featured} className="sr-only" />
                <span className={`pk-tier-ic bg-gradient-to-br ${TIERS[i].grad}`} aria-hidden="true">{`0${i + 1}`}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2 font-display text-lg font-bold text-ink">
                    {p.name}
                    {p.featured && <span className="rounded-full bg-amber-100 px-2 py-0.5 font-sans text-[0.7rem] font-bold uppercase tracking-wide text-amber-800">Most popular</span>}
                  </span>
                  <span className="block text-sm text-muted">{p.forWho}</span>
                  <span className="pk-meter" aria-hidden="true">
                    {[0, 1, 2].map((m) => <i key={m} className={m <= i ? "on" : ""} />)}
                  </span>
                </span>
                <I.Arrow className="pk-tier-arrow size-5 shrink-0" />
              </label>
            ))}
          </fieldset>

          <div className="pk-stage">
            {PACKAGES.map((p, i) => (
              <article key={p.name} className={`pk-panel pk-panel-${i}`} style={{ "--c": TIERS[i].c } as React.CSSProperties} aria-label={`${p.name} package`}>
                <div className="flex items-center gap-5">
                  <div className="pk-iso" aria-hidden="true">
                    <div className="pk-iso-in">
                      {TIERS[i].slabs.map((label, n) => (
                        <span key={label} className={`pk-slab pk-slab-${n}`} style={{ "--n": n } as React.CSSProperties}>{n === TIERS[i].slabs.length - 1 ? label : ""}</span>
                      ))}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: TIERS[i].c }}>{TIERS[i].level}</p>
                    <h3 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">{p.name}</h3>
                    <p className="mt-1 text-muted">{p.forWho}</p>
                    <p className={`mt-3 inline-block bg-gradient-to-r bg-clip-text font-display text-xl font-bold text-transparent ${TIERS[i].grad}`}>
                      {p.price ? <>From {p.price}</> : "Fixed quote in 24 hrs"}
                    </p>
                  </div>
                </div>
                <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-ink-2">
                      <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gradient-to-br text-white ${TIERS[i].grad}`}><I.Check className="size-3" /></span>
                      {it}
                    </li>
                  ))}
                </ul>
                <a href="#quote" data-track="cta_click" data-loc="packages" data-pkg={p.name} className={`btn mt-7 w-full bg-gradient-to-r text-white shadow-lg sm:w-auto ${TIERS[i].btn}`}>
                  Get {p.name} quote <I.Arrow className="size-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const VS_META = [
  { tag: "Your WooCommerce partner", Icon: I.Users, ring: "#0f9d94" },
  { tag: "Single developer", Icon: I.Code, ring: "#f59e0b" },
  { tag: "Do it yourself", Icon: I.Layout, ring: "#f43f5e" },
];

function Compare() {
  const total = COMPARE.rows.length;
  // Show RannLab in the middle on desktop, first on mobile.
  const order = [1, 0, 2];
  return (
    <section aria-labelledby="compare-title" className="vs-band relative overflow-hidden bg-surface py-16 sm:py-24">
      <div className="container-x">
        <SectionHead id="compare-title" eyebrow="Why choose us" title="Agency quality without agency headaches" sub="The same checklist, three ways to build your store. See what you actually get." />
        <ul className="vs-stage mt-14 grid gap-6 lg:grid-cols-[1fr_1.12fr_1fr] lg:items-center lg:gap-0">
          {order.map((col) => {
            const name = COMPARE.cols[col];
            const meta = VS_META[col];
            const score = COMPARE.rows.filter((r) => r.v[col] === true).length;
            const hero = col === 0;
            return (
              <li key={name} className={`reveal ${hero ? "order-first lg:order-none" : ""}`}>
                <article className={`vs-card ${hero ? "vs-hero" : col === 1 ? "vs-left" : "vs-right"}`} aria-label={`${name}: ${score} of ${total} covered`}>
                  {hero && <span className="vs-badge"><I.Star className="size-3.5" /> Recommended</span>}
                  <header className="flex items-center gap-4">
                    <span className="vs-ring" style={{ "--p": (score / total) * 100, "--c": meta.ring } as React.CSSProperties} aria-hidden="true">
                      <b>{score}<small>/{total}</small></b>
                    </span>
                    <div>
                      <p className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${hero ? "text-teal-700" : "text-muted"}`}>
                        <meta.Icon className="size-3.5" /> {meta.tag}
                      </p>
                      <h3 className={`mt-1 font-display text-xl font-bold ${hero ? "text-ink sm:text-2xl" : "text-ink-2"}`}>{name}</h3>
                    </div>
                  </header>
                  <ul className="mt-5">
                    {COMPARE.rows.map((r) => {
                      const v = r.v[col];
                      return (
                        <li key={r.label} className="vs-row">
                          {v === true ? (
                            <span className="vs-ic vs-yes"><I.Check className="size-3.5" /><span className="sr-only">Yes:</span></span>
                          ) : v === false ? (
                            <span className="vs-ic vs-no"><I.Cross className="size-3.5" /><span className="sr-only">No:</span></span>
                          ) : (
                            <span className="vs-ic vs-mid" aria-hidden="true">~</span>
                          )}
                          <span className={`text-[0.95rem] leading-snug ${v === false ? "text-muted line-through decoration-rose-300/70" : "text-ink-2"}`}>
                            {r.label}
                            {typeof v === "string" && <span className="ml-1.5 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">{v}</span>}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  {hero && (
                    <a href="#quote" data-track="cta_click" data-loc="compare" className="btn btn-primary mt-6 w-full">
                      Get my fixed quote <I.Arrow className="size-4" />
                    </a>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Client regions for the live dotted globe (drawn on canvas by enhance.ts). First entry is the hub. */
const GLOBE_PINS = [
  { label: "India", lat: 21, lon: 78, c: "#fbbf24" },
  { label: "USA", lat: 39, lon: -98, c: "#2dd4bf" },
  { label: "UK", lat: 53, lon: -2, c: "#a78bfa" },
  { label: "Canada", lat: 56, lon: -106, c: "#fb7185" },
  { label: "Australia", lat: -25, lon: 134, c: "#38bdf8" },
];
const WHY_STATS = [
  { v: "10+", l: "Years of engineering", c: "from-teal-200 to-emerald-400" },
  { v: "5", l: "Countries served", c: "from-amber-200 to-orange-400" },
  { v: "ISO", l: "27001 security practices", c: "from-violet-200 to-fuchsia-400" },
];

function WhyRannlab() {
  return (
    <section aria-labelledby="why-title" className="band-dark why-band py-16 sm:py-24">
      <div className="container-x">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="reveal">
            <p className="eyebrow eyebrow-dark">Why {SITE.shortBrand}</p>
            <h2 id="why-title" className="mt-3 text-3xl font-bold leading-tight text-white sm:text-5xl sm:leading-[1.08]">
              An AI-first software company that <span className="why-grad">builds stores to last</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg text-white/75">
              {SITE.brand} has spent 10+ years building web, mobile and custom software for businesses worldwide. Your WooCommerce store gets the same engineering standards.
            </p>
            <dl className="mt-8 grid max-w-lg grid-cols-3 gap-3">
              {WHY_STATS.map((st) => (
                <div key={st.l} className="why-stat">
                  <dt className="order-2 mt-1 text-xs font-medium leading-snug text-white/70 sm:text-sm">{st.l}</dt>
                  <dd className={`order-1 bg-gradient-to-r bg-clip-text font-display text-2xl font-bold text-transparent sm:text-3xl ${st.c}`} data-count={/^\d+/.test(st.v) ? st.v : undefined}>{st.v}</dd>
                </div>
              ))}
            </dl>
            <a href={SITE.links.about} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 font-bold text-white ring-1 ring-white/20 transition hover:bg-white/15">
              About {SITE.brand} <I.Arrow className="size-4" />
            </a>
          </div>
          <div className="globe-stage reveal">
            <div className="globe-box">
              <div className="globe-halo" aria-hidden="true" />
              <canvas className="globe-canvas" data-globe={JSON.stringify(GLOBE_PINS)} aria-hidden="true" />
            </div>
            <ul className="globe-legend" aria-label="Countries we serve">
              {GLOBE_PINS.map((p) => (
                <li key={p.label}><i style={{ background: p.c, color: p.c }} aria-hidden="true" />{p.label}</li>
              ))}
            </ul>
          </div>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {WHY.map((w, i) => {
            const Icon = ICONS[w.icon];
            return (
              <li key={w.title} className="why-card tilt reveal" data-tilt3d style={{ "--glow": acc(i).glow, animationDelay: `${i * 90}ms` } as React.CSSProperties}>
                <span className="why-num" aria-hidden="true">{`0${i + 1}`}</span>
                <span className={`cube grid size-12 place-items-center rounded-xl bg-gradient-to-br text-white ${acc(i).bar}`} style={{ "--cube": acc(i).glow } as React.CSSProperties}><Icon /></span>
                <h3 className="mt-5 text-lg font-bold text-white">{w.title}</h3>
                <p className="mt-2 text-white/70">{w.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 bg-surface py-16 sm:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="mt-3 text-3xl font-bold text-ink sm:text-4xl">WooCommerce development: common questions</h2>
          <p className="mt-4 text-lg text-muted">Straight answers on cost, timelines, payments and what happens after launch.</p>
          <div className="mt-8 rounded-2xl bg-white p-6 ring-1 ring-line">
            <p className="font-display text-lg font-bold text-ink">Still have a question?</p>
            <p className="mt-1 text-muted">Talk to a WooCommerce expert. We usually reply within a few hours.</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <WaButton location="faq" className="flex-1" label="WhatsApp us" />
              <a href={`tel:${SITE.phoneE164}`} data-track="call_click" data-loc="faq" className="btn btn-ghost flex-1">
                <I.Phone /> Call now
              </a>
            </div>
          </div>
        </div>
        <div className="min-w-0 space-y-3 lg:mt-4">
          {FAQS.map((f, i) => (
            <details key={f.q} className="group rounded-2xl bg-white p-5 ring-1 ring-line open:ring-teal-300 sm:p-6" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <h3 className="font-sans text-lg font-bold tracking-normal text-ink">{f.q}</h3>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-700 transition-transform group-open:rotate-45" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </summary>
              <p className="faq-answer mt-3 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section aria-labelledby="final-title" className="band-dark py-16 sm:py-24" data-cta3d>
      <canvas className="dot-wave dot-wave-cta" data-wave aria-hidden="true" />
      <div className="container-x text-center">
        <p className="extrude" aria-hidden="true">LAUNCH</p>
        <h2 id="final-title" className="mx-auto max-w-3xl text-3xl font-bold sm:text-4xl">
          Ready to start selling online? Let's build your WooCommerce store.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">Talk to a RannLab WooCommerce expert today. Free consultation, fixed quote within 24 hours.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#quote" data-track="cta_click" data-loc="final" className="btn btn-primary text-lg">Get my free quote <I.Arrow /></a>
          <WaButton location="final" className="text-lg" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const socials: [string, string, (p: { className?: string }) => React.JSX.Element][] = [
    ["LinkedIn", SITE.social.linkedin, I.LinkedIn],
    ["Instagram", SITE.social.instagram, I.Instagram],
    ["Facebook", SITE.social.facebook, I.Facebook],
    ["YouTube", SITE.social.youtube, I.YouTube],
    ["X", SITE.social.x, I.XLogo],
  ];
  const a = "underline-offset-2 transition-colors hover:text-teal-300 hover:underline";
  return (
    <footer className="border-t border-white/10 bg-night pb-28 pt-14 text-white/75 md:pb-10">
      <div className="container-x grid gap-10 md:grid-cols-[1.3fr_1fr_0.8fr]">
        <div>
          <img src="/brand/rannlab-logo-light-203.webp" srcSet="/brand/rannlab-logo-light-203.webp 203w, /brand/rannlab-logo-light.webp 405w" sizes="203px" alt={`${SITE.brand}: ${SITE.tagline}`} width={203} height={56} loading="lazy" className="h-14 w-auto" />
          <p className="mt-4 max-w-sm">AI-first software development company building websites, e-commerce stores, mobile apps and custom software for businesses worldwide.</p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {socials.map(([label, href, Icon]) => (
              <li key={label}>
                <a
                  href={href}
                  rel="noopener"
                  target="_blank"
                  aria-label={`${SITE.shortBrand} on ${label}`}
                  title={label}
                  className="grid size-11 place-items-center rounded-full bg-white/[0.07] text-white/85 ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:bg-teal-500 hover:text-night hover:ring-teal-500"
                >
                  <Icon className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <address className="not-italic">
          <p className="font-display font-bold text-white">Contact</p>
          <ul className="mt-4 space-y-3">
            <li className="flex gap-2.5"><I.Phone className="mt-1 size-4 shrink-0 text-teal-300" /><span><a className={a} href={`tel:${SITE.phoneE164}`}>{SITE.phoneDisplay}</a>, <a className={a} href={`tel:+${SITE.whatsappNumber}`}>{SITE.phoneAltDisplay}</a></span></li>
            <li className="flex gap-2.5"><I.Mail className="mt-1 size-4 shrink-0 text-teal-300" /><a className={a} href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li className="flex gap-2.5"><I.Pin className="mt-1 size-4 shrink-0 text-teal-300" /><a className={a} href={SITE.mapUrl} rel="noopener" target="_blank">{SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}</a></li>
          </ul>
        </address>
        <nav aria-label="Company links">
          <p className="font-display font-bold text-white">Company</p>
          <ul className="mt-4 space-y-2">
            <li><a className={a} href={SITE.links.about}>About RannLab</a></li>
            <li><a className={a} href={SITE.links.services}>All services</a></li>
            <li><a className={a} href={SITE.links.ecommerce}>E-commerce development</a></li>
            <li><a className={a} href={SITE.links.caseStudies}>Case studies</a></li>
            <li><a className={a} href={SITE.links.contact}>Contact us</a></li>
          </ul>
        </nav>
      </div>
      <div className="container-x mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/65 md:flex-row md:items-center md:justify-between">
        <p>© {year} {SITE.brand}. All rights reserved.</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          <li><a className={a} href={SITE.legal.privacy}>Privacy policy</a></li>
          <li><a className={a} href={SITE.legal.terms}>Terms</a></li>
          <li><a className={a} href={SITE.legal.refund}>Refund policy</a></li>
        </ul>
      </div>
    </footer>
  );
}

function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 gap-2 border-t border-line bg-white/95 p-2 shadow-[0_-6px_24px_rgb(0_0_0/0.08)] backdrop-blur md:hidden">
      <a href={`tel:${SITE.phoneE164}`} data-track="call_click" data-loc="mobile-bar" className="btn btn-outline btn-sm flex-col gap-0.5 !py-2 text-xs">
        <I.Phone className="size-5" /> Call
      </a>
      <a href={WA_DEFAULT} target="_blank" rel="noopener" data-track="whatsapp_click" data-loc="mobile-bar" className="btn btn-wa btn-sm flex-col gap-0.5 !py-2 text-xs">
        <I.WhatsApp className="size-5" /> WhatsApp
      </a>
      <a href="#quote" data-track="cta_click" data-loc="mobile-bar" className="btn btn-primary btn-sm flex-col gap-0.5 !py-2 text-xs">
        <I.Receipt className="size-5" /> Free quote
      </a>
    </div>
  );
}

export function Landing() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Proof />
        <Pains />
        <StoreTypes />
        <Features />
        <QuoteBlock />
        <Services />
        <Process />
        <Packages />
        <Compare />
        <WhyRannlab />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
      <script
        dangerouslySetInnerHTML={{
          __html: `(${enhance.toString()})(${JSON.stringify({ brand: SITE.shortBrand, wa: SITE.whatsappNumber, endpoint: SITE.leadEndpoint })})`,
        }}
      />
    </>
  );
}
