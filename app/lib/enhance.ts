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

  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll reveal: only blocks that start below the fold are hidden, so nothing visible ever flickers.
  if (!calm && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.remove("reveal-pending");
          en.target.classList.add("reveal-show");
          io.unobserve(en.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    // Measure everything first, then write, so the browser lays out the page only once.
    const below = Array.from(document.querySelectorAll<HTMLElement>(".reveal")).filter(
      (el) => el.getBoundingClientRect().top > innerHeight,
    );
    below.forEach((el) => {
      el.classList.add("reveal-pending");
      io.observe(el);
    });
  }

  // 3D: the hero scene swings with the pointer; cards tilt toward it with a moving glare.
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const scene = document.querySelector<HTMLElement>("[data-scene]");
  const rig = scene?.querySelector<HTMLElement>(".scene-rig");
  const glare = scene?.querySelector<HTMLElement>(".glare");
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (!calm && finePointer && rig && hero) {
    let raf = 0;
    hero.addEventListener("pointermove", (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        rig.style.setProperty("--ry", `${-22 + x * 30}deg`);
        rig.style.setProperty("--rx", `${12 - y * 18}deg`);
        glare?.style.setProperty("--gx", `${50 + x * 100}%`);
        glare?.style.setProperty("--gy", `${50 + y * 100}%`);
      });
    });
    hero.addEventListener("pointerleave", () => {
      rig.style.removeProperty("--ry");
      rig.style.removeProperty("--rx");
    });
  }
  if (!calm && finePointer) {
    document.querySelectorAll<HTMLElement>("[data-tilt3d]").forEach((card) => {
      let raf = 0;
      card.addEventListener("pointermove", (e) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          card.style.setProperty("--ty", `${(x - 0.5) * 16}deg`);
          card.style.setProperty("--tx", `${(0.5 - y) * 12}deg`);
          card.style.setProperty("--gx", `${x * 100}%`);
          card.style.setProperty("--gy", `${y * 100}%`);
        });
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--tx", "0deg");
        card.style.setProperty("--ty", "0deg");
      });
    });
  }

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
        // Captured in the CRM even if the visitor never presses Send in WhatsApp.
        const q = new URLSearchParams(location.search);
        const utm: Record<string, string> = {};
        ["utm_source", "utm_medium", "utm_campaign", "gclid"].forEach((k) => {
          const v = q.get(k);
          if (v) utm[k] = v;
        });
        const idempotencyKey =
          form.dataset.key || (form.dataset.key = Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 12));
        try {
          fetch(cfg.endpoint, {
            method: "POST",
            keepalive: true,
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              name, phone, need, details, utm, idempotencyKey,
              website: String(fd.get("website") || ""),
              page: location.pathname,
            }),
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
