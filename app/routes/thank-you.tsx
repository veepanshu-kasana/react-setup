import { SITE, waLink } from "../site";
import { Arrow, Check, Phone, WhatsApp } from "../components/icons";

export function meta() {
  return [
    { title: `Thank you | ${SITE.brand}` },
    { name: "description", content: "We have received your enquiry. Our team will contact you shortly." },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

/** Static page: no client-side React. */
export const handle = { hydrate: false };

export default function ThankYou() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="border-b border-line/80 bg-white">
        <div className="container-x flex h-16 items-center sm:h-[4.5rem]">
          <a href="/" className="shrink-0">
            <img src="/brand/rannlab-logo-200.webp" srcSet="/brand/rannlab-logo-200.webp 200w, /brand/rannlab-logo.webp 398w" sizes="170px" alt="RannLab Technologies" width={170} height={34} className="h-[30px] w-auto sm:h-[34px]" />
          </a>
        </div>
      </header>

      <main id="main" className="container-x flex flex-1 items-center justify-center py-16">
        <div className="w-full max-w-xl rounded-[1.4rem] bg-white p-8 text-center shadow-[0_24px_60px_-30px_rgb(15_23_42/0.35)] ring-1 ring-line sm:p-12">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-success-50 text-success">
            <Check className="size-8" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-ink sm:text-4xl">Thank you!</h1>
          <p className="mt-3 text-lg text-ink-2">We have received your enquiry.</p>
          <p className="mt-2 text-muted">
            Our team will call you on your mobile number with your free quote, usually within a few hours
            (always within 24 hours).
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a href={`tel:${SITE.phoneE164}`} data-track="call_click" data-loc="thank-you" className="btn btn-ghost w-full">
              <Phone className="size-5" /> Call us now
            </a>
            <a
              href={waLink(`Hi ${SITE.shortBrand}, I just sent an enquiry on your website.`)}
              target="_blank"
              rel="noopener"
              data-track="wa_click"
              data-loc="thank-you"
              className="btn btn-wa w-full"
            >
              <WhatsApp className="size-5" /> Chat on WhatsApp
            </a>
          </div>

          <a href="/" className="mt-8 inline-flex items-center gap-1.5 font-semibold text-teal-700 hover:underline">
            Back to homepage <Arrow className="size-4" />
          </a>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted">
        © {new Date().getFullYear()} {SITE.brand} · {SITE.phoneDisplay}
      </footer>
    </div>
  );
}
