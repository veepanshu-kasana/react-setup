import { SITE } from "../site";
import { Arrow, Check, Shield } from "./icons";
import { usePage } from "../pages/types";


/**
 * Static, pre-rendered lead form. Behaviour (validation + WhatsApp hand-off) is added by
 * app/lib/enhance.ts. Without JavaScript it still opens a WhatsApp chat with the team.
 */
export function LeadForm({ id, heading = "Get a free quote in 24 hours" }: { id: string; heading?: string }) {
  const f = (s: string) => `${id}-${s}`;
  const NEEDS = usePage().needs;
  return (
    <div>
      <form
        data-lead={id}
        action={`https://wa.me/${SITE.whatsappNumber}`}
        method="get"
        target="_blank"
        noValidate
        aria-labelledby={f("h")}
        className="relative rounded-[1.4rem] bg-white p-6 text-ink sm:p-8"
      >
        <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-teal-800">
          <span className="size-2 rounded-full bg-teal-500" aria-hidden="true" /> 100% free · No obligation
        </p>
        <h2 id={f("h")} className="text-xl font-bold sm:text-2xl">{heading}</h2>
        <p className="mt-1 text-sm text-muted">Takes 30 seconds. No spam, no obligation.</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={f("name")} className="label">Your name</label>
            <input id={f("name")} name="name" autoComplete="name" required minLength={2} maxLength={60} className="field" />
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
                maxLength={14}
                pattern="[6-9][0-9]{9}"
                placeholder="98765 43210"
                title="10-digit Indian mobile number starting with 6, 7, 8 or 9"
                className="field rounded-l-none"
              />
            </div>
            <p id={f("phone-err")} data-err="phone" className="err" hidden />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={f("need")} className="label">What do you need?</label>
            <select id={f("need")} name="need" className="field" defaultValue={NEEDS[0]}>
              {NEEDS.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
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
          <Shield className="size-4 shrink-0" /> <span>Your details are only used to contact you about your project. <a href={SITE.legal.privacy} className="underline underline-offset-2 hover:text-teal-700">Privacy policy</a></span>
        </p>
      </form>

      <div
        data-done
        hidden
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="rounded-[1.4rem] bg-white p-6 text-ink sm:p-8"
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
