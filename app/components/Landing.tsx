import { SITE, WA_DEFAULT } from "../site";
import { enhance } from "../lib/enhance";
import {
  COMPARE, FAQS, FEATURES, HERO_POINTS, PACKAGES, PAINS, PLATFORMS, PROCESS, REVIEWS, SERVICES,
} from "../content";
import { LeadForm } from "./LeadForm";
import * as I from "./icons";

const ICONS: Record<string, (p: { className?: string }) => React.JSX.Element> = {
  card: I.Card, truck: I.Truck, receipt: I.Receipt, chat: I.Chat, bolt: I.Bolt, search: I.Search,
  cart: I.Cart, refresh: I.Refresh, layers: I.Layers, wrench: I.Wrench, shield: I.Shield, mobile: I.Mobile,
};

const NAV = [
  ["#features", "Features"],
  ["#services", "Services"],
  ["#process", "Process"],
  ["#packages", "Packages"],
  ["#faq", "FAQ"],
] as const;

function WaButton({ location, className = "", label = "Chat on WhatsApp" }: { location: string; className?: string; label?: string }) {
  return (
    <a
      href={WA_DEFAULT}
      target="_blank"
      rel="noopener"
      data-track="whatsapp_click" data-loc={location}
      className={`btn btn-wa ${className}`}
    >
      <I.WhatsApp /> {label}
    </a>
  );
}

function CallButton({ location, className = "" }: { location: string; className?: string }) {
  return (
    <a href={`tel:${SITE.phoneE164}`} data-track="call_click" data-loc={location} className={`btn btn-ghost ${className}`}>
      <I.Phone /> {SITE.phoneDisplay}
    </a>
  );
}

function SectionHead({ eyebrow, title, sub, id }: { eyebrow: string; title: string; sub?: string; id: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-lg text-muted">{sub}</p>}
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2 font-extrabold text-ink">
          <span className="grid size-9 place-items-center rounded-lg bg-brand text-white" aria-hidden="true">M</span>
          <span className="text-lg leading-none">Midvana<span className="hidden font-semibold text-muted sm:inline"> Intelligence</span></span>
        </a>
        <nav aria-label="Page sections" className="hidden lg:block">
          <ul className="flex gap-7 text-[0.95rem] font-medium text-ink-2">
            {NAV.map(([href, label]) => (
              <li key={href}><a className="hover:text-brand" href={href}>{label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${SITE.phoneE164}`}
            data-track="call_click" data-loc="header"
            className="hidden items-center gap-2 px-2 py-2 font-semibold text-ink md:inline-flex"
          >
            <I.Phone className="size-4 text-brand" /> {SITE.phoneDisplay}
          </a>
          <a href="#quote" data-track="cta_click" data-loc="header" className="btn btn-primary btn-sm">
            Free quote
          </a>
        </div>
      </div>
    </header>
  );
}

function StoreMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      <div className="rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-white/20">
        <div className="flex items-center gap-1.5 pb-3">
          <span className="size-2.5 rounded-full bg-[#f87171]" /><span className="size-2.5 rounded-full bg-[#fbbf24]" /><span className="size-2.5 rounded-full bg-[#34d399]" />
          <span className="ml-3 h-5 flex-1 rounded bg-surface" />
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2 aspect-[4/5] rounded-xl bg-gradient-to-br from-[#fde68a] via-[#fca5a5] to-[#c4b5fd]" />
          <div className="col-span-3 space-y-2.5 pt-1">
            <div className="h-3 w-4/5 rounded bg-ink/80" />
            <div className="h-3 w-3/5 rounded bg-ink/20" />
            <div className="flex items-center gap-1 text-[#f59e0b]"><I.Star className="size-3" /><I.Star className="size-3" /><I.Star className="size-3" /><I.Star className="size-3" /><I.Star className="size-3" /></div>
            <p className="text-xl font-extrabold text-ink">₹1,299 <span className="text-sm font-medium text-muted line-through">₹1,999</span></p>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold">
              <span className="rounded bg-success-50 px-1.5 py-0.5 text-success">UPI</span>
              <span className="rounded bg-success-50 px-1.5 py-0.5 text-success">COD</span>
              <span className="rounded bg-brand-50 px-1.5 py-0.5 text-brand">Free shipping</span>
            </div>
            <div className="rounded-lg bg-brand py-2 text-center text-sm font-bold text-white">Buy now</div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-xl ring-1 ring-line sm:-left-8">
        <span className="grid size-9 place-items-center rounded-full bg-success-50 text-success"><I.Cart className="size-5" /></span>
        <span className="text-sm leading-tight"><b className="block text-ink">New order · ₹2,598</b><span className="text-muted">Paid via UPI · Jaipur</span></span>
      </div>
      <div className="absolute -right-3 -top-4 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm shadow-xl ring-1 ring-line">
        <I.Bolt className="size-4 text-brand" /><b className="text-ink">Fast on 4G</b>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="hero-bg relative overflow-hidden text-white">
      <div className="container-x grid gap-12 pb-16 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pb-24 lg:pt-16">
        <div>
          <nav aria-label="Breadcrumb" className="text-sm text-white/80">
            <ol className="flex flex-wrap gap-1.5">
              <li><a className="underline-offset-2 hover:underline" href={SITE.mainSite}>Home</a> <span aria-hidden="true">/</span></li>
              <li aria-current="page">WooCommerce Website Development</li>
            </ol>
          </nav>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium ring-1 ring-white/25">
            <span className="size-2 rounded-full bg-[#4ade80]" aria-hidden="true" /> Now booking new store projects
          </p>
          <h1 id="hero-title" className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            WooCommerce Website Development Company in India
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90 sm:text-xl">
            We build fast, mobile-first online stores that turn visitors into paying customers — with Indian payments, shipping and GST already set up.
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {HERO_POINTS.map((p) => (
              <li key={p} className="flex gap-2.5 text-[0.97rem] text-white/95">
                <I.Check className="mt-0.5 size-5 shrink-0 text-[#86efac]" /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#quote" data-track="cta_click" data-loc="hero" className="btn btn-light text-lg">
              Get a free quote <I.Arrow />
            </a>
            <WaButton location="hero" className="text-lg" />
          </div>
          <p className="mt-5 text-sm text-white/80">Free consultation · Fixed price · You own your store</p>
        </div>
        <div className="hidden lg:block">
          <StoreMockup />
        </div>
      </div>
    </section>
  );
}

function Platforms() {
  return (
    <section aria-label="Platforms and tools we integrate" className="border-b border-line bg-white py-8">
      <div className="container-x">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-muted">Platforms & tools we set up for you</p>
        <ul className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3 text-lg font-bold text-ink-2">
          {PLATFORMS.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </div>
    </section>
  );
}

function QuoteBlock() {
  return (
    <section id="quote" aria-labelledby="quote-title" className="scroll-mt-20 bg-surface py-16 sm:py-20">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">Free quote</p>
          <h2 id="quote-title" className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Tell us about your store. Get a fixed quote in 24 hours.
          </h2>
          <p className="mt-4 text-lg text-muted">
            No sales pressure. A WooCommerce expert reviews your needs and sends a clear, itemised plan with price and timeline.
          </p>
          <ul className="mt-6 space-y-3 text-ink-2">
            {["Free 20-minute strategy call", "Itemised quote — no hidden charges", "Design approval before development starts", "Support continues after launch"].map((t) => (
              <li key={t} className="flex gap-3"><I.Check className="mt-0.5 size-5 shrink-0 text-success" /> {t}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WaButton location="quote-section" />
            <CallButton location="quote-section" />
          </div>
        </div>
        <LeadForm id="quote-form" />
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
          sub="These are the problems we hear most from Indian business owners — and exactly what our WooCommerce builds are designed to fix."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {PAINS.map((p) => (
            <li key={p.title} className="rounded-2xl border border-line bg-white p-6">
              <span className="grid size-10 place-items-center rounded-full bg-danger-50 text-danger"><I.Cross /></span>
              <h3 className="mt-4 text-lg font-bold text-ink">{p.title}</h3>
              <p className="mt-2 text-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
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
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = ICONS[f.icon];
            return (
              <li key={f.title} className="card">
                <span className="icon-tile"><Icon /></span>
                <h3 className="mt-4 text-lg font-bold text-ink">{f.title}</h3>
                <p className="mt-2 text-muted">{f.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-20 bg-white py-16 sm:py-24">
      <div className="container-x">
        <SectionHead
          id="services-title"
          eyebrow="Our WooCommerce services"
          title="From a brand-new store to a complete rebuild"
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <li key={s.title} className="card">
                <span className="icon-tile"><Icon /></span>
                <h3 className="mt-4 text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-muted">{s.body}</p>
              </li>
            );
          })}
        </ul>
        <div className="mt-10 text-center">
          <a href="#quote" data-track="cta_click" data-loc="services" className="btn btn-primary">
            Discuss my project <I.Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="scroll-mt-20 bg-ink py-16 text-white sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow eyebrow-dark">How it works</p>
          <h2 id="process-title" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Your store live in about 4 weeks</h2>
          <p className="mt-4 text-lg text-white/80">A simple, transparent process with your approval at every step.</p>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p) => (
            <li key={p.step} className="rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/15">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-[#c4b5fd]">{p.step}</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{p.time}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-white/80">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section id="packages" aria-labelledby="packages-title" className="scroll-mt-20 bg-surface py-16 sm:py-24">
      <div className="container-x">
        <SectionHead
          id="packages-title"
          eyebrow="Packages"
          title="Choose a starting point. We tailor the rest."
          sub="Every package is a fixed-price project. Tell us what you need and get an exact quote within 24 hours."
        />
        <ul className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {PACKAGES.map((p) => (
            <li
              key={p.name}
              className={`relative flex flex-col rounded-2xl bg-white p-7 ${p.featured ? "shadow-xl ring-2 ring-brand" : "ring-1 ring-line"}`}
            >
              {p.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-sm font-bold text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-extrabold text-ink">{p.name}</h3>
              <p className="mt-1 text-muted">{p.forWho}</p>
              <p className="mt-5 text-2xl font-extrabold text-ink">{p.price ? <>From {p.price}</> : "Fixed quote in 24 hrs"}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-2.5 text-ink-2"><I.Check className="mt-0.5 size-5 shrink-0 text-success" /> {it}</li>
                ))}
              </ul>
              <a
                href="#quote"
                data-track="cta_click" data-loc="packages" data-pkg={p.name}
                className={`btn mt-8 w-full ${p.featured ? "btn-primary" : "btn-outline"}`}
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
      <><I.Check className="mx-auto size-6 text-success" /><span className="sr-only">Yes</span></>
    ) : v === false ? (
      <><I.Cross className="mx-auto size-6 text-danger" /><span className="sr-only">No</span></>
    ) : (
      <span className="text-sm text-muted">{v}</span>
    );
  return (
    <section aria-labelledby="compare-title" className="bg-white py-16 sm:py-24">
      <div className="container-x">
        <SectionHead id="compare-title" eyebrow="Why choose us" title="Agency quality without agency headaches" />
        <div className="relative mt-12 overflow-x-auto rounded-2xl ring-1 ring-line" role="region" aria-labelledby="compare-title" tabIndex={0}>
          <table className="w-full min-w-[640px] border-collapse text-left">
            <caption className="sr-only">Comparison of {SITE.brand} with a typical freelancer and a DIY website builder</caption>
            <thead>
              <tr className="bg-surface">
                <th scope="col" className="p-4 font-semibold text-ink">What you get</th>
                {COMPARE.cols.map((c, i) => (
                  <th key={c} scope="col" className={`p-4 text-center font-bold ${i === 0 ? "bg-brand text-white" : "text-ink"}`}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE.rows.map((r) => (
                <tr key={r.label} className="border-t border-line">
                  <th scope="row" className="p-4 font-medium text-ink-2">{r.label}</th>
                  {r.v.map((v, i) => (
                    <td key={i} className={`p-4 text-center ${i === 0 ? "bg-brand-50" : ""}`}>{cell(v)}</td>
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

function Reviews() {
  return (
    <section aria-labelledby="reviews-title" className="bg-surface py-16 sm:py-24">
      <div className="container-x">
        <SectionHead id="reviews-title" eyebrow="Client reviews" title="What business owners say about working with us" />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <li key={r.name} className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-line">
              <div className="flex gap-0.5 text-[#b45309]" role="img" aria-label="Rated 5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((i) => <I.Star key={i} className="size-5" />)}
              </div>
              <blockquote className="mt-4 flex-1 text-ink-2">“{r.text}”</blockquote>
              <p className="mt-5 font-bold text-ink">{r.name}</p>
              <p className="text-sm text-muted">Review on Google</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 bg-white py-16 sm:py-24">
      <div className="container-x max-w-3xl">
        <SectionHead id="faq-title" eyebrow="FAQ" title="WooCommerce development — common questions" />
        <div className="mt-10 divide-y divide-line rounded-2xl ring-1 ring-line">
          {FAQS.map((f, i) => (
            <details key={f.q} className="group p-5 sm:p-6" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-ink">
                <h3 className="text-lg font-semibold">{f.q}</h3>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface text-brand transition-transform group-open:rotate-45" aria-hidden="true">
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
    <section aria-labelledby="final-title" className="hero-bg py-16 text-white sm:py-20">
      <div className="container-x text-center">
        <h2 id="final-title" className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">
          Ready to start selling online? Let's build your WooCommerce store.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">Talk to a WooCommerce expert today — free consultation, fixed quote within 24 hours.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#quote" data-track="cta_click" data-loc="final" className="btn btn-light text-lg">Get my free quote <I.Arrow /></a>
          <WaButton location="final" className="text-lg" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink pb-28 pt-14 text-white/80 md:pb-10">
      <div className="container-x grid gap-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold text-white">{SITE.brand}</p>
          <p className="mt-3">Website design, WooCommerce development and digital marketing for Indian businesses.</p>
          <ul className="mt-4 flex gap-4">
            <li><a className="underline-offset-2 hover:underline" href={SITE.social.facebook} rel="noopener" target="_blank">Facebook</a></li>
            <li><a className="underline-offset-2 hover:underline" href={SITE.social.instagram} rel="noopener" target="_blank">Instagram</a></li>
          </ul>
        </div>
        <address className="not-italic">
          <p className="font-bold text-white">Contact</p>
          <p className="mt-3">Phone: <a className="underline-offset-2 hover:underline" href={`tel:${SITE.phoneE164}`}>{SITE.phoneDisplay}</a></p>
          <p className="mt-1">Email: <a className="underline-offset-2 hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          <p className="mt-1">{SITE.address.street}, {SITE.address.city} {SITE.address.postalCode}, {SITE.address.region}, India</p>
        </address>
        <nav aria-label="Legal and company links">
          <p className="font-bold text-white">Company</p>
          <ul className="mt-3 space-y-1">
            <li><a className="underline-offset-2 hover:underline" href={`${SITE.mainSite}/about/`}>About {SITE.brand}</a></li>
            <li><a className="underline-offset-2 hover:underline" href={`${SITE.mainSite}/services/`}>All digital services</a></li>
            <li><a className="underline-offset-2 hover:underline" href={SITE.legal.privacy}>Privacy policy</a></li>
            <li><a className="underline-offset-2 hover:underline" href={SITE.legal.terms}>Terms & conditions</a></li>
            <li><a className="underline-offset-2 hover:underline" href={SITE.legal.refund}>Refund policy</a></li>
          </ul>
        </nav>
      </div>
      <p className="container-x mt-10 border-t border-white/15 pt-6 text-sm text-white/70">
        © {year} {SITE.brand}. All rights reserved. WooCommerce and WordPress are trademarks of their respective owners.
      </p>
    </footer>
  );
}

function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 gap-2 border-t border-line bg-white p-2 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden">
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
        <Platforms />
        <Pains />
        <Features />
        <QuoteBlock />
        <Services />
        <Process />
        <Packages />
        <Compare />
        <Reviews />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
      <script
        dangerouslySetInnerHTML={{
          __html: `(${enhance.toString()})(${JSON.stringify({ brand: SITE.brand, wa: SITE.whatsappNumber, endpoint: SITE.leadEndpoint })})`,
        }}
      />
    </>
  );
}
