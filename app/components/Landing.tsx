import { SITE, WA_DEFAULT } from "../site";
import { enhance } from "../lib/enhance";
import {
  COMPARE, FAQS, FEATURES, HERO_POINTS, PACKAGES, PAINS, PLATFORMS, PROCESS, PROOF, REGIONS, SERVICES, WHY,
} from "../content";
import { LeadForm } from "./LeadForm";
import * as I from "./icons";

const ICONS: Record<string, (p: { className?: string }) => React.JSX.Element> = {
  card: I.Card, truck: I.Truck, receipt: I.Receipt, chat: I.Chat, bolt: I.Bolt, search: I.Search,
  cart: I.Cart, refresh: I.Refresh, layers: I.Layers, wrench: I.Wrench, shield: I.Shield, mobile: I.Mobile,
  chart: I.Chart,
};
const PROOF_ICONS = [I.Calendar, I.Users, I.Code, I.Award];

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

function SectionHead({ eyebrow, title, sub, id, dark = false }: { eyebrow: string; title: string; sub?: string; id: string; dark?: boolean }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className={`eyebrow ${dark ? "eyebrow-dark" : ""}`}>{eyebrow}</p>
      <h2 id={id} className={`mt-3 text-3xl font-bold sm:text-4xl ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {sub && <p className={`mt-4 text-lg ${dark ? "text-white/75" : "text-muted"}`}>{sub}</p>}
    </div>
  );
}

/** Decorative circuit traces, echoing the circuit-board "A" in the RannLab logo. */
function Circuit({ className = "" }: { className?: string }) {
  return (
    <svg className={`circuit ${className}`} viewBox="0 0 600 400" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
      <path d="M0 60h180l40 40h160l30-30h190" />
      <path d="M0 140h120l40 40h220l60 60h160" />
      <path d="M60 400V300l40-40h140l40-40h320" />
      <path d="M320 0v80l40 40v120l-40 40v120" />
      <path d="M460 0v60l-40 40" />
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

/* ---------- Hero illustration: storefront + phone checkout, built in HTML/CSS (no image requests) ---------- */

function ProductTile({ from, to, name, price }: { from: string; to: string; name: string; price: string }) {
  return (
    <div className="rounded-lg bg-white p-1.5 ring-1 ring-black/5">
      <div className="aspect-square rounded-md" style={{ background: `linear-gradient(140deg, ${from}, ${to})` }} />
      <p className="mt-1.5 truncate text-[10px] font-semibold text-ink">{name}</p>
      <p className="text-[10px] font-bold text-teal-700">{price}</p>
    </div>
  );
}

function StoreShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem] px-2 pb-10 pt-14 sm:px-6" aria-hidden="true">
      {/* Desktop storefront */}
      <div className="overflow-hidden rounded-2xl bg-[#eef3f3] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)] ring-1 ring-white/10">
        <div className="flex items-center gap-1.5 bg-white px-3 py-2">
          <span className="size-2.5 rounded-full bg-[#f87171]" /><span className="size-2.5 rounded-full bg-[#fbbf24]" /><span className="size-2.5 rounded-full bg-[#34d399]" />
          <span className="ml-2 flex h-5 flex-1 items-center gap-1 rounded-md bg-surface px-2 text-[10px] text-muted">
            <I.Shield className="size-3 text-success" /> yourbrand.in
          </span>
        </div>
        <div className="flex items-center justify-between bg-white px-3 pb-2 text-[10px] font-semibold text-ink-2">
          <span className="font-display text-xs font-bold text-ink">yourbrand</span>
          <span className="hidden gap-3 sm:flex"><span>New</span><span>Women</span><span>Men</span><span>Sale</span></span>
          <span className="relative"><I.Cart className="size-4" /><span className="absolute -right-1.5 -top-1.5 grid size-3.5 place-items-center rounded-full bg-teal-700 text-[8px] text-white">2</span></span>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between overflow-hidden rounded-xl bg-gradient-to-r from-teal-800 to-teal-500 p-3 text-white">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-white/85">Festive sale</p>
              <p className="font-display text-sm font-bold leading-tight">Flat 30% off<br />+ free shipping</p>
              <span className="mt-2 inline-block rounded-md bg-white px-2 py-0.5 text-[9px] font-bold text-teal-800">Shop now</span>
            </div>
            <div className="flex gap-1.5">
              <span className="h-16 w-10 rounded-t-full bg-[#fcd34d]/90" />
              <span className="mt-4 h-12 w-10 rounded-t-full bg-white/80" />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
            <ProductTile from="#fde68a" to="#f59e0b" name="Cotton kurta" price="₹1,299" />
            <ProductTile from="#a7f3d0" to="#1fa59c" name="Linen shirt" price="₹999" />
            <ProductTile from="#fecaca" to="#e11d48" name="Silk dupatta" price="₹1,599" />
            <div className="hidden sm:block"><ProductTile from="#c7d2fe" to="#6366f1" name="Denim jacket" price="₹2,199" /></div>
          </div>
        </div>
      </div>

      {/* Phone: UPI checkout */}
      <div className="absolute -bottom-2 right-0 w-[42%] max-w-[12rem] rounded-[1.6rem] bg-ink p-1.5 shadow-[0_30px_60px_-15px_rgb(0_0_0/0.7)] ring-1 ring-white/15 sm:right-2">
        <div className="overflow-hidden rounded-[1.25rem] bg-white">
          <div className="mx-auto mt-1.5 h-1.5 w-12 rounded-full bg-ink/80" />
          <div className="p-2.5">
            <p className="text-[10px] font-semibold text-muted">Checkout</p>
            <p className="font-display text-base font-bold text-ink">₹2,598</p>
            <div className="mt-2 space-y-1.5 text-[10px] font-semibold">
              <div className="flex items-center justify-between rounded-md bg-teal-50 px-2 py-1.5 text-teal-800 ring-1 ring-teal-500">
                UPI <span className="grid size-3 place-items-center rounded-full bg-teal-700"><span className="size-1.5 rounded-full bg-white" /></span>
              </div>
              <div className="flex items-center justify-between rounded-md px-2 py-1.5 text-ink-2 ring-1 ring-line">Cards <span className="size-3 rounded-full ring-1 ring-line" /></div>
              <div className="flex items-center justify-between rounded-md px-2 py-1.5 text-ink-2 ring-1 ring-line">Cash on Delivery <span className="size-3 rounded-full ring-1 ring-line" /></div>
            </div>
            <div className="mt-2.5 rounded-md bg-teal-700 py-1.5 text-center text-[10px] font-bold text-white">Pay securely</div>
          </div>
        </div>
      </div>

      {/* Floating proof chips */}
      <div className="absolute right-2 top-0 flex items-center gap-2.5 rounded-xl bg-white px-3 py-2 shadow-xl ring-1 ring-black/5 sm:right-8">
        <svg viewBox="0 0 36 36" className="size-9 -rotate-90" aria-hidden="true">
          <circle cx="18" cy="18" r="15" fill="none" stroke="#d3efed" strokeWidth="4" />
          <circle cx="18" cy="18" r="15" fill="none" stroke="#15803d" strokeWidth="4" strokeDasharray="94.2 94.2" strokeLinecap="round" />
        </svg>
        <span className="text-xs leading-tight"><b className="block font-display text-sm text-ink">100</b><span className="text-muted">PageSpeed</span></span>
      </div>
      <div className="absolute bottom-6 left-0 flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-xl ring-1 ring-black/5 sm:-left-4">
        <span className="grid size-9 place-items-center rounded-full bg-success-50 text-success"><I.Check className="size-5" /></span>
        <span className="text-xs leading-tight"><b className="block text-sm text-ink">New order · ₹2,598</b><span className="text-muted">Paid via UPI · Jaipur</span></span>
      </div>
    </div>
  );
}

/* ---------- Sections ---------- */

function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="band-dark">
      <Circuit className="-right-24 top-10 hidden w-[38rem] lg:block" />
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
            WooCommerce Website Development Company in <span className="text-teal-300">India</span>
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
        <StoreShowcase />
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
                <span className="icon-tile shrink-0"><Icon /></span>
                <span>
                  <span className="block whitespace-nowrap font-display text-2xl font-bold text-ink sm:text-3xl">{p.value}</span>
                  <span className="block text-sm text-muted">{p.label}</span>
                </span>
              </li>
            );
          })}
        </ul>
        <div className="mt-9 flex flex-col items-center gap-4 border-t border-line pt-7 lg:flex-row lg:justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Platforms & tools we set up</p>
          <ul className="flex flex-wrap justify-center gap-2">
            {PLATFORMS.map((p) => (
              <li key={p} className="rounded-full bg-surface px-3.5 py-1.5 text-sm font-semibold text-ink-2 ring-1 ring-line">{p}</li>
            ))}
          </ul>
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
          eyebrow="Why most online stores don't sell"
          title="A good-looking website is not the same as a store that sells"
          sub="These are the problems we hear most from Indian business owners, and exactly what our WooCommerce builds are designed to fix."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {PAINS.map((p) => (
            <li key={p.title} className="rounded-2xl bg-surface p-6 ring-1 ring-line">
              <span className="grid size-10 place-items-center rounded-full bg-danger-50 text-danger ring-1 ring-danger/15"><I.Cross /></span>
              <h3 className="mt-4 text-lg font-bold text-ink">{p.title}</h3>
              <p className="mt-2 text-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function IconCards({ items }: { items: readonly { icon: string; title: string; body: string }[] }) {
  return (
    <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f) => {
        const Icon = ICONS[f.icon];
        return (
          <li key={f.title} className="card">
            <span className="icon-tile"><Icon /></span>
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
    <section id="features" aria-labelledby="features-title" className="scroll-mt-20 bg-surface py-16 sm:py-24">
      <div className="container-x">
        <SectionHead
          id="features-title"
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
        <LeadForm id="quote-form" />
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-20 bg-surface py-16 sm:py-24">
      <div className="container-x">
        <SectionHead id="services-title" eyebrow="Our WooCommerce services" title="From a brand-new store to a complete rebuild" />
        <IconCards items={SERVICES} />
        <div className="mt-10 text-center">
          <a href="#quote" data-track="cta_click" data-loc="services" className="btn btn-primary">Discuss my project <I.Arrow /></a>
        </div>
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
        <ol className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <span className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-teal-500/0 via-teal-500/60 to-teal-500/0 lg:block" aria-hidden="true" />
          {PROCESS.map((p) => (
            <li key={p.step} className="relative rounded-2xl bg-night-2 p-6 ring-1 ring-white/10">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl bg-teal-700 font-display text-lg font-bold text-white ring-4 ring-night">{p.step}</span>
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

function Packages() {
  return (
    <section id="packages" aria-labelledby="packages-title" className="scroll-mt-20 bg-white py-16 sm:py-24">
      <div className="container-x">
        <SectionHead
          id="packages-title"
          eyebrow="Packages"
          title="Choose a starting point. We tailor the rest."
          sub="Every package is a fixed-price project. Tell us what you need and get an exact quote within 24 hours."
        />
        <ul className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {PACKAGES.map((p) => (
            <li
              key={p.name}
              className={`relative flex flex-col rounded-2xl p-7 ${p.featured ? "bg-night text-white shadow-[0_30px_60px_-25px_rgb(11_110_106/0.7)] ring-2 ring-teal-500" : "bg-white ring-1 ring-line"}`}
            >
              {p.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-teal-500 px-4 py-1 text-sm font-bold text-night">Most popular</span>
              )}
              <h3 className={`text-xl font-bold ${p.featured ? "text-white" : "text-ink"}`}>{p.name}</h3>
              <p className={p.featured ? "mt-1 text-white/75" : "mt-1 text-muted"}>{p.forWho}</p>
              <p className={`mt-5 font-display text-2xl font-bold ${p.featured ? "text-teal-300" : "text-ink"}`}>{p.price ? <>From {p.price}</> : "Fixed quote in 24 hrs"}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.items.map((it) => (
                  <li key={it} className={`flex gap-2.5 ${p.featured ? "text-white/90" : "text-ink-2"}`}>
                    <I.Check className={`mt-0.5 size-5 shrink-0 ${p.featured ? "text-teal-300" : "text-teal-700"}`} /> {it}
                  </li>
                ))}
              </ul>
              <a
                href="#quote"
                data-track="cta_click"
                data-loc="packages"
                data-pkg={p.name}
                className={`btn mt-8 w-full ${p.featured ? "bg-teal-500 text-night hover:bg-teal-300" : "btn-outline"}`}
              >
                Get {p.name} quote
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Compare() {
  const cell = (v: boolean | string) =>
    v === true ? (
      <><span className="mx-auto grid size-7 place-items-center rounded-full bg-teal-700 text-white"><I.Check className="size-4" /></span><span className="sr-only">Yes</span></>
    ) : v === false ? (
      <><I.Cross className="mx-auto size-5 text-danger" /><span className="sr-only">No</span></>
    ) : (
      <span className="text-sm text-muted">{v}</span>
    );
  return (
    <section aria-labelledby="compare-title" className="bg-surface py-16 sm:py-24">
      <div className="container-x">
        <SectionHead id="compare-title" eyebrow="Why choose us" title="Agency quality without agency headaches" />
        <div className="relative mt-12 overflow-x-auto rounded-2xl bg-white ring-1 ring-line" role="region" aria-labelledby="compare-title" tabIndex={0}>
          <table className="w-full min-w-[640px] border-collapse text-left">
            <caption className="sr-only">Comparison of {SITE.shortBrand} with a typical freelancer and a DIY website builder</caption>
            <thead>
              <tr>
                <th scope="col" className="p-4 font-semibold text-ink">What you get</th>
                {COMPARE.cols.map((c, i) => (
                  <th key={c} scope="col" className={`p-4 text-center font-bold ${i === 0 ? "bg-teal-700 text-white" : "text-ink"}`}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE.rows.map((r) => (
                <tr key={r.label} className="border-t border-line">
                  <th scope="row" className="p-4 font-medium text-ink-2">{r.label}</th>
                  {r.v.map((v, i) => (
                    <td key={i} className={`p-4 text-center ${i === 0 ? "bg-teal-50" : ""}`}>{cell(v)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function WhyRannlab() {
  return (
    <section aria-labelledby="why-title" className="bg-white py-16 sm:py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow">Why {SITE.shortBrand}</p>
          <h2 id="why-title" className="mt-3 text-3xl font-bold text-ink sm:text-4xl">An AI-first software company that builds stores to last</h2>
          <p className="mt-4 text-lg text-muted">
            {SITE.brand} has spent 10+ years building web, mobile and custom software for businesses worldwide. Your WooCommerce store gets the same engineering standards.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-ink-2">
            <I.Globe className="size-5 text-teal-700" /> Serving clients in
          </div>
          <ul className="mt-3 flex flex-wrap gap-2">
            {REGIONS.map((r) => (
              <li key={r} className="rounded-full bg-teal-50 px-3.5 py-1.5 text-sm font-semibold text-teal-800 ring-1 ring-teal-100">{r}</li>
            ))}
          </ul>
          <a href={SITE.links.about} className="mt-8 inline-flex items-center gap-2 font-bold text-teal-700 underline-offset-4 hover:underline">
            About {SITE.brand} <I.Arrow className="size-4" />
          </a>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2">
          {WHY.map((w) => {
            const Icon = ICONS[w.icon];
            return (
              <li key={w.title} className="rounded-2xl bg-surface p-6 ring-1 ring-line">
                <span className="icon-tile bg-white"><Icon /></span>
                <h3 className="mt-4 text-lg font-bold text-ink">{w.title}</h3>
                <p className="mt-2 text-muted">{w.body}</p>
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
      <div className="container-x max-w-3xl">
        <SectionHead id="faq-title" eyebrow="FAQ" title="WooCommerce development: common questions" />
        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => (
            <details key={f.q} className="group rounded-2xl bg-white p-5 ring-1 ring-line open:ring-teal-300 sm:p-6" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <h3 className="font-sans text-lg font-bold tracking-normal text-ink">{f.q}</h3>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-700 transition-transform group-open:rotate-45" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </summary>
              <p className="mt-3 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section aria-labelledby="final-title" className="band-dark py-16 sm:py-20">
      <Circuit className="-left-40 -top-24 w-[30rem] opacity-50" />
      <Circuit className="-right-24 -bottom-24 hidden w-[32rem] opacity-80 md:block" />
      <div className="container-x text-center">
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
  const socials: [string, string][] = [
    ["LinkedIn", SITE.social.linkedin],
    ["Instagram", SITE.social.instagram],
    ["Facebook", SITE.social.facebook],
    ["YouTube", SITE.social.youtube],
    ["X (Twitter)", SITE.social.x],
  ];
  const a = "underline-offset-2 transition-colors hover:text-teal-300 hover:underline";
  return (
    <footer className="border-t border-white/10 bg-night pb-28 pt-14 text-white/75 md:pb-10">
      <div className="container-x grid gap-10 md:grid-cols-[1.3fr_1fr_0.8fr]">
        <div>
          <img src="/brand/rannlab-logo-light-203.webp" srcSet="/brand/rannlab-logo-light-203.webp 203w, /brand/rannlab-logo-light.webp 405w" sizes="203px" alt={`${SITE.brand}: ${SITE.tagline}`} width={203} height={56} loading="lazy" className="h-14 w-auto" />
          <p className="mt-4 max-w-sm">AI-first software development company building websites, e-commerce stores, mobile apps and custom software for businesses worldwide.</p>
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {socials.map(([label, href]) => (
              <li key={label}><a className={a} href={href} rel="noopener" target="_blank">{label}</a></li>
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
