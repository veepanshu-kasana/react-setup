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

  // 3D: the hero product ring and the CTA lettering lean toward the pointer.
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const lean = (zone: HTMLElement | null, target: HTMLElement | null, apply: (x: number, y: number) => void, reset: () => void) => {
    if (!zone || !target || calm || !finePointer) return;
    let raf = 0;
    zone.addEventListener("pointermove", (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = zone.getBoundingClientRect();
        apply((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
      });
    });
    zone.addEventListener("pointerleave", reset);
  };
  const ringTilt = document.querySelector<HTMLElement>(".ring-tilt");
  lean(
    document.querySelector<HTMLElement>("[data-hero]"),
    ringTilt,
    (x, y) => {
      ringTilt!.style.setProperty("--turn", `${x * 40}deg`);
      ringTilt!.style.setProperty("--tilt", `${-10 - y * 16}deg`);
    },
    () => {
      ringTilt!.style.removeProperty("--turn");
      ringTilt!.style.removeProperty("--tilt");
    },
  );
  const extrude = document.querySelector<HTMLElement>(".extrude");
  lean(
    document.querySelector<HTMLElement>("[data-cta3d]"),
    extrude,
    (x, y) => {
      extrude!.style.setProperty("--ey", `${x * 30}deg`);
      extrude!.style.setProperty("--ex", `${18 - y * 24}deg`);
    },
    () => {
      extrude!.style.removeProperty("--ey");
      extrude!.style.removeProperty("--ex");
    },
  );

  // Stats count up when they come into view.
  if (!calm && "IntersectionObserver" in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        cio.unobserve(en.target);
        const el = en.target as HTMLElement;
        const target = parseInt(el.dataset.count || "0", 10);
        const suffix = (el.dataset.count || "").replace(/^\d+/, "");
        const t0 = performance.now();
        const tick = (now: number) => {
          const k = Math.min(1, (now - t0) / 1400);
          el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + suffix;
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => cio.observe(el));
  }

  // Live 3D dot-wave (canvas). Starts after load, pauses off-screen, one still frame for reduced motion.
  const startWaves = () => {
    document.querySelectorAll<HTMLCanvasElement>("canvas[data-wave]").forEach((cv) => {
      const ctx = cv.getContext("2d");
      if (!ctx) return;
      const dpr = Math.min(1.5, devicePixelRatio || 1);
      let W = 0, H = 0, visible = false, raf = 0;
      const size = () => {
        W = cv.clientWidth; H = cv.clientHeight;
        cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      const COLS = innerWidth < 640 ? 34 : 64, ROWS = 20;
      const draw = (t: number) => {
        ctx.clearRect(0, 0, W, H);
        const time = t / 1000;
        for (let j = 0; j < ROWS; j++) {
          const z = j / (ROWS - 1);              // 0 = far, 1 = near
          const persp = 0.35 + z * 0.9;
          for (let i = 0; i < COLS; i++) {
            const u = i / (COLS - 1) - 0.5;
            const wave = Math.sin(u * 7 + time * 1.1 + z * 3) * Math.cos(z * 5 - time * 0.8) * 0.5 + Math.sin(u * 3 - time * 0.6) * 0.3;
            const x = W / 2 + u * W * 1.25 * persp;
            const y = H * (0.12 + z * 0.86) - wave * 26 * persp;
            const mix = (u + 0.5);               // teal → saffron across the width
            const rC = Math.round(31 + (245 - 31) * mix * 0.7);
            const gC = Math.round(165 + (158 - 165) * mix);
            const bC = Math.round(156 + (11 - 156) * mix * 0.8);
            ctx.fillStyle = `rgba(${rC},${gC},${bC},${0.15 + z * 0.65})`;
            ctx.beginPath();
            ctx.arc(x, y, 0.6 + z * 1.9 + Math.max(0, wave) * 1.2, 0, 6.283);
            ctx.fill();
          }
        }
      };
      const loop = (t: number) => {
        draw(t);
        if (visible) raf = requestAnimationFrame(loop);
      };
      size();
      addEventListener("resize", () => { size(); if (calm || !visible) draw(0); }, { passive: true });
      if (calm) { draw(0); return; }
      new IntersectionObserver(([en]) => {
        visible = en.isIntersecting && !document.hidden;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(loop);
      }).observe(cv);
      document.addEventListener("visibilitychange", () => {
        cancelAnimationFrame(raf);
        visible = !document.hidden && cv.getBoundingClientRect().top < innerHeight;
        if (visible) raf = requestAnimationFrame(loop);
      });
    });
  };
  const idle = (cb: () => void) => ("requestIdleCallback" in window ? (window as unknown as { requestIdleCallback: (f: () => void, o?: object) => void }).requestIdleCallback(cb, { timeout: 1500 }) : setTimeout(cb, 300));
  if (document.readyState === "complete") idle(startWaves);
  else addEventListener("load", () => idle(startWaves), { once: true });

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
            // text/plain keeps this a "simple" cross-origin request (no preflight), so it
            // still sends with keepalive while the visitor switches to WhatsApp.
            headers: { "Content-Type": "text/plain;charset=UTF-8" },
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
