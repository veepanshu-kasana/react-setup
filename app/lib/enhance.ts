/**
 * Tiny progressive-enhancement script (no framework, ~1 kB) that runs on the
 * pre-rendered landing page. It handles:
 *  - conversion tracking: any element with data-track pushes to window.dataLayer (GTM / GA4 ready)
 *  - the lead form: validation, optional POST to a CRM endpoint, then WhatsApp hand-off
 *
 * It is serialised with Function.prototype.toString(), so it must be fully self-contained.
 */
export type EnhanceConfig = { brand: string; wa: string; endpoint: string };

export function enhance(cfg: EnhanceConfig) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  const dl = (w.dataLayer = w.dataLayer || []);

  document.addEventListener("click", (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-track]");
    if (el) dl.push({ event: el.dataset.track, location: el.dataset.loc, package: el.dataset.pkg });
  });

  document.querySelectorAll<HTMLFormElement>("form[data-lead]").forEach((form) => {
    const box = form.parentElement!;
    const done = box.querySelector<HTMLElement>("[data-done]")!;
    const doneLink = done.querySelector<HTMLAnchorElement>("[data-done-link]")!;

    const setErr = (name: string, msg: string) => {
      const input = form.elements.namedItem(name) as HTMLInputElement;
      const err = form.querySelector<HTMLElement>(`[data-err="${name}"]`)!;
      err.textContent = msg;
      err.hidden = !msg;
      if (msg) {
        input.setAttribute("aria-invalid", "true");
        input.setAttribute("aria-describedby", err.id);
      } else {
        input.removeAttribute("aria-invalid");
        input.removeAttribute("aria-describedby");
      }
      return !msg;
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      const phone = String(fd.get("phone") || "")
        .replace(/[\s()-]/g, "")
        .replace(/^(\+91|91|0)(?=\d{10}$)/, "");
      const need = String(fd.get("need") || "");
      const details = String(fd.get("details") || "").trim();

      const okName = setErr("name", name.length < 2 ? "Please enter your name." : "");
      const okPhone = setErr("phone", /^[6-9]\d{9}$/.test(phone) ? "" : "Please enter a valid 10-digit mobile number.");
      if (!okName || !okPhone) {
        (form.elements.namedItem(okName ? "phone" : "name") as HTMLInputElement).focus();
        return;
      }

      if (cfg.endpoint) {
        try {
          fetch(cfg.endpoint, {
            method: "POST",
            keepalive: true,
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ name, phone, need, details, page: location.href }),
          }).catch(() => {});
        } catch {
          /* WhatsApp hand-off below still captures the lead */
        }
      }

      const msg =
        `Hi ${cfg.brand}, I'd like a quote for a WooCommerce website.\n\n` +
        `Name: ${name}\nMobile: ${phone}\nRequirement: ${need}` +
        (details ? `\nAbout my business: ${details}` : "");
      const link = `https://wa.me/${cfg.wa}?text=${encodeURIComponent(msg)}`;
      dl.push({ event: "generate_lead", form_location: form.dataset.lead, requirement: need });

      doneLink.href = link;
      form.hidden = true;
      done.hidden = false;
      done.focus();
      window.open(link, "_blank", "noopener");
    });
  });
}
