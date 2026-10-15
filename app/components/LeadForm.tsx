import { SITE } from "../site";
import { Arrow, Check, Shield } from "./icons";

const NEEDS = [
  "New WooCommerce store",
  "Migrate my store to WooCommerce",
  "Redesign / improve conversions",
  "Speed optimisation",
  "Custom feature or plugin",
  "Not sure yet",
];

/**
 * Static, pre-rendered lead form. Behaviour (validation + WhatsApp hand-off) is added by
 * app/lib/enhance.ts. Without JavaScript it still opens a WhatsApp chat with the team.
 */
export function LeadForm({ id, heading = "Get a free quote in 24 hours" }: { id: string; heading?: string }) {
  const f = (s: string) => `${id}-${s}`;
  return (
    <div>
      <form
        data-lead={id}
        action={`https://wa.me/${SITE.whatsappNumber}`}
        method="get"
        target="_blank"
        noValidate
        aria-labelledby={f("h")}
        className="relative rounded-2xl border-t-4 border-teal-500 bg-white p-6 text-ink shadow-[0_30px_60px_-30px_rgb(18_26_28/0.45)] ring-1 ring-line sm:p-8"
      >
        <h2 id={f("h")} className="text-xl font-bold sm:text-2xl">{heading}</h2>
        <p className="mt-1 text-sm text-muted">Takes 30 seconds. No spam, no obligation.</p>

        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor={f("name")} className="label">Your name</label>
            <input id={f("name")} name="name" autoComplete="name" required className="field" />
            <p id={f("name-err")} data-err="name" className="err" hidden />
          </div>
          <div>
            <label htmlFor={f("phone")} className="label">Mobile / WhatsApp number</label>
            <div className="flex">
              <span className="inline-flex items-center rounded-l-lg border border-r-0 border-line bg-surface px-3 text-muted" aria-hidden="true">+91</span>
              <input
                id={f("phone")}
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                required
                maxLength={16}
                className="field rounded-l-none"
              />
            </div>
            <p id={f("phone-err")} data-err="phone" className="err" hidden />
          </div>
          <div>
            <label htmlFor={f("need")} className="label">What do you need?</label>
            <select id={f("need")} name="need" className="field" defaultValue={NEEDS[0]}>
              {NEEDS.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={f("details")} className="label">
              What do you sell? <span className="font-normal text-muted">(optional)</span>
            </label>
            <input id={f("details")} name="details" className="field" placeholder="e.g. handmade jewellery, 80 products" />
          </div>
        </div>

        {/* Spam trap: hidden from people, bots tend to fill it in */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor={f("website")}>Leave this field empty</label>
          <input id={f("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <button type="submit" className="btn btn-primary mt-6 w-full text-lg">
          Get my free quote <Arrow />
        </button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
          <Shield className="size-4 shrink-0" /> Your details are only used to contact you about your project.
        </p>
      </form>

      <div
        data-done
        hidden
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="rounded-2xl border-t-4 border-teal-500 bg-white p-6 text-ink shadow-[0_30px_60px_-30px_rgb(18_26_28/0.45)] ring-1 ring-line sm:p-8"
      >
        <div className="mx-auto grid size-12 place-items-center rounded-full bg-success-50 text-success">
          <Check className="size-6" />
        </div>
        <p className="mt-4 text-center text-xl font-bold">Thank you! Your enquiry is ready.</p>
        <p className="mt-2 text-center text-muted">
          Press <strong>Send</strong> in WhatsApp and our team will reply with your free quote, usually within a few hours.
        </p>
        <a data-done-link href={`https://wa.me/${SITE.whatsappNumber}`} target="_blank" rel="noopener" className="btn btn-wa mt-6 w-full">
          WhatsApp didn't open? Tap here
        </a>
        <p className="mt-4 text-center text-sm text-muted">
          Or call us on{" "}
          <a className="font-semibold text-teal-700 underline" href={`tel:${SITE.phoneE164}`} data-track="call_click" data-loc="form-success">
            {SITE.phoneDisplay}
          </a>
        </p>
      </div>
    </div>
  );
}
