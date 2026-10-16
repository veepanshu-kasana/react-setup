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
  const extrude = document.querySelector<HTMLElement>(".cta-tilt");
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

  const stack = document.querySelector<HTMLElement>("[data-formstack]");
  lean(
    stack,
    stack,
    (x, y) => {
      stack!.style.setProperty("--fy", `${x * 10}deg`);
      stack!.style.setProperty("--fx", `${-y * 8}deg`);
    },
    () => {
      stack!.style.removeProperty("--fy");
      stack!.style.removeProperty("--fx");
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
  // Live dotted globe with arcs from India to client countries. Pauses off-screen; still frame for reduced motion.
  const startGlobes = () => {
    document.querySelectorAll<HTMLCanvasElement>("canvas[data-globe]").forEach((cv) => {
      const ctx = cv.getContext("2d");
      if (!ctx) return;
      type Pin = { label: string; lat: number; lon: number; c: string };
      const pins = JSON.parse(cv.dataset.globe || "[]") as Pin[];
      if (!pins.length) return;
      const dpr = Math.min(2, devicePixelRatio || 1);
      const D = Math.PI / 180, TILT = 0.42, ct = Math.cos(TILT), st = Math.sin(TILT);
      let W = 0, R = 0, visible = false, raf = 0;
      const size = () => {
        W = cv.clientWidth;
        cv.width = cv.height = Math.round(W * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        R = W * 0.34;
      };
      const vec = (lat: number, lon: number) => [Math.cos(lat * D) * Math.sin(lon * D), Math.sin(lat * D), Math.cos(lat * D) * Math.cos(lon * D)];
      const N = innerWidth < 640 ? 700 : 1200, GA = Math.PI * (3 - Math.sqrt(5));
      const dots: number[][] = [];
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y);
        dots.push([Math.cos(GA * i) * r, y, Math.sin(GA * i) * r]);
      }
      const hub = vec(pins[0].lat, pins[0].lon);
      const SEG = 56;
      const arcs = pins.slice(1).map((p) => {
        const b = vec(p.lat, p.lon);
        const om = Math.acos(Math.min(1, hub[0] * b[0] + hub[1] * b[1] + hub[2] * b[2]));
        const lift = Math.min(0.26, 0.1 + om * 0.09);
        const pts: number[][] = [];
        for (let j = 0; j <= SEG; j++) {
          const s = j / SEG, k = 1 + Math.sin(Math.PI * s) * lift;
          const A = Math.sin((1 - s) * om) / Math.sin(om), B = Math.sin(s * om) / Math.sin(om);
          pts.push([(A * hub[0] + B * b[0]) * k, (A * hub[1] + B * b[1]) * k, (A * hub[2] + B * b[2]) * k]);
        }
        return { c: p.c, pts };
      });
      const proj = (v: number[], rot: number) => {
        const cr = Math.cos(rot), sr = Math.sin(rot);
        const x = v[0] * cr + v[2] * sr, z0 = -v[0] * sr + v[2] * cr, y = v[1] * ct - z0 * st;
        // [screen x, screen y, depth, visible?] — a raised arc point is visible in front or outside the disc
        return [W / 2 + x * R, W / 2 - y * R, v[1] * st + z0 * ct, v[1] * st + z0 * ct > 0 || x * x + y * y > 1 ? 1 : 0];
      };
      const draw = (t: number) => {
        ctx.clearRect(0, 0, W, W);
        const rot = -pins[0].lon * D + 0.75 - t * 0.0001;
        // sphere of dots, back ones faint
        for (const d of dots) {
          const [x, y, z] = proj(d, rot);
          if (z < 0) {
            ctx.fillStyle = "rgba(94,234,212,0.07)";
            ctx.fillRect(x - 0.5, y - 0.5, 1, 1);
            continue;
          }
          const lat = d[1];
          ctx.fillStyle = `rgba(${Math.round(94 + 120 * Math.max(0, lat))},${Math.round(234 - 20 * Math.abs(lat))},${Math.round(212 + 40 * lat)},${0.18 + z * 0.62})`;
          ctx.beginPath();
          ctx.arc(x, y, 0.6 + z * 1.15, 0, 6.283);
          ctx.fill();
        }
        ctx.strokeStyle = "rgba(94,234,212,0.28)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(W / 2, W / 2, R, 0, 6.283);
        ctx.stroke();
        // arcs with travelling comets
        ctx.lineCap = "round";
        arcs.forEach((a, i) => {
          const P = a.pts.map((v) => proj(v, rot));
          ctx.strokeStyle = a.c;
          ctx.globalAlpha = 0.32;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          for (let j = 1; j < P.length; j++) {
            if (P[j][3] && P[j - 1][3]) { ctx.moveTo(P[j - 1][0], P[j - 1][1]); ctx.lineTo(P[j][0], P[j][1]); }
          }
          ctx.stroke();
          const head = ((t * 0.00022 + i * 0.27) % 1.35);
          ctx.lineWidth = 2.4;
          for (let j = 1; j < P.length; j++) {
            const s = j / SEG, f = (s - (head - 0.28)) / 0.28;
            if (f <= 0 || s > head || !P[j][3] || !P[j - 1][3]) continue;
            ctx.globalAlpha = Math.min(1, f);
            ctx.beginPath();
            ctx.moveTo(P[j - 1][0], P[j - 1][1]);
            ctx.lineTo(P[j][0], P[j][1]);
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
        });
        // pins with pulse rings and labels
        ctx.font = '700 12px "Plus Jakarta Sans Variable", system-ui, sans-serif';
        pins.forEach((p, i) => {
          const [x, y, z] = proj(vec(p.lat, p.lon), rot);
          if (z < 0.05) return;
          const al = Math.min(1, z * 3);
          const ph = ((t / 1000) * 0.8 + i * 0.37) % 1;
          ctx.globalAlpha = al * (1 - ph);
          ctx.strokeStyle = p.c;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, 5 + ph * 16, 0, 6.283);
          ctx.stroke();
          ctx.globalAlpha = al;
          ctx.shadowColor = p.c;
          ctx.shadowBlur = 14;
          ctx.fillStyle = p.c;
          ctx.beginPath();
          ctx.arc(x, y, i === 0 ? 6 : 4.5, 0, 6.283);
          ctx.fill();
          ctx.shadowBlur = 0;
          const tw = ctx.measureText(p.label).width + 16, lx = x + 10, ly = y - 24;
          ctx.fillStyle = "rgba(255,255,255,0.94)";
          ctx.beginPath();
          if (ctx.roundRect) ctx.roundRect(lx, ly, tw, 20, 10); else ctx.rect(lx, ly, tw, 20);
          ctx.fill();
          ctx.fillStyle = "#0b1f24";
          ctx.fillText(p.label, lx + 8, ly + 14);
          ctx.globalAlpha = 1;
        });
      };
      const loop = (t: number) => {
        draw(t);
        if (visible) raf = requestAnimationFrame(loop);
      };
      size();
      addEventListener("resize", () => { size(); if (calm || !visible) draw(0); }, { passive: true });
      draw(0);
      if (calm) return;
      new IntersectionObserver(([en]) => {
        visible = en.isIntersecting && !document.hidden;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(loop);
      }).observe(cv);
    });
  };
  const idle = (cb: () => void) => ("requestIdleCallback" in window ? (window as unknown as { requestIdleCallback: (f: () => void, o?: object) => void }).requestIdleCallback(cb, { timeout: 1500 }) : setTimeout(cb, 300));
  const startCanvases = () => { startWaves(); startGlobes(); };
  if (document.readyState === "complete") idle(startCanvases);
  else addEventListener("load", () => idle(startCanvases), { once: true });

  // Arrow buttons for horizontal card rows.
  document.querySelectorAll<HTMLButtonElement>("[data-scroll-btn]").forEach((btn) => {
    const track = document.getElementById(btn.getAttribute("aria-controls") || "");
    if (!track) return;
    btn.addEventListener("click", () => {
      const card = track.querySelector("li");
      const step = card ? card.getBoundingClientRect().width + 20 : 320;
      track.scrollBy({ left: step * Number(btn.dataset.scrollBtn || 1), behavior: calm ? "auto" : "smooth" });
    });
  });

  // Auto-slide horizontal card rows while visible; pauses on hover, focus or touch.
  if (!calm) {
    document.querySelectorAll<HTMLElement>("[data-scroller]").forEach((track) => {
      let paused = false, visible = false, timer = 0;
      const step = () => {
        if (paused || !visible || document.hidden) return;
        const card = track.querySelector("li");
        const w = card ? card.getBoundingClientRect().width + 20 : 320;
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
        track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + w, behavior: "smooth" });
      };
      const pause = () => { paused = true; };
      const resume = () => { paused = false; };
      track.addEventListener("pointerenter", pause);
      track.addEventListener("pointerleave", resume);
      track.addEventListener("focusin", pause);
      track.addEventListener("focusout", resume);
      track.addEventListener("touchstart", () => { paused = true; clearTimeout(timer); timer = window.setTimeout(resume, 6000); }, { passive: true });
      new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0.4 }).observe(track);
      setInterval(step, 3200);
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


    // Same rules as the server (app/routes/api.lead.ts and the lead connector).
    const phoneError = (p: string) => {
      if (!p) return "Please enter your mobile number.";
      if (!/^\d{10}$/.test(p)) return "Mobile number must be exactly 10 digits.";
      if (!/^[6-9]/.test(p)) return "Indian mobile numbers start with 6, 7, 8 or 9.";
      const distinct = new Set(p.split("")).size;
      // Longest run of consecutive digits going up or down (e.g. 3456789 or 9876543).
      let run = 1, maxRun = 1, prev = 0;
      for (let i = 1; i < 10; i++) {
        const d = +p[i] - +p[i - 1];
        const seq = d === 1 || d === -1;
        run = seq && d === prev ? run + 1 : seq ? 2 : 1;
        prev = d;
        maxRun = Math.max(maxRun, run);
      }
      const fake = ["9876543210", "9123456789", "9012345678", "8765432109", "7894561230", "9638527410", "9988776655", "9876598765", "9999988888"];
      if (distinct < 4 || /(\d)\1{5,}/.test(p) || /^(\d{2})\1{4}$/.test(p) || /^(\d{5})\1$/.test(p) || maxRun >= 8 || fake.includes(p))
        return "This doesn't look like a real mobile number. Please check it.";
      return "";
    };
    const nameError = (n: string) => {
      if (n.length < 2) return "Please enter your name.";
      if (!/^[\p{L} .'-]+$/u.test(n) || !/\p{L}.*\p{L}/u.test(n)) return "Please enter your name using letters only.";
      if (/^(.)\1+$/u.test(n.replace(/\s/g, "").toLowerCase())) return "Please enter your real name.";
      return "";
    };
    const cleanPhone = (v: string) => {
      let d = v.replace(/\D/g, "");
      if (d.length > 10 && /^(91|0)/.test(d)) d = d.replace(/^(91|0)/, "");
      return d.slice(0, 10);
    };

    // Live checks: digits only while typing, a clear message as soon as the field is left.
    const phoneInput = form.elements.namedItem("phone") as HTMLInputElement;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    phoneInput.addEventListener("input", () => {
      const c = cleanPhone(phoneInput.value);
      if (c !== phoneInput.value) phoneInput.value = c;
      if (phoneInput.hasAttribute("aria-invalid") && !phoneError(c)) setErr("phone", "");
    });
    phoneInput.addEventListener("blur", () => { if (phoneInput.value) setErr("phone", phoneError(cleanPhone(phoneInput.value))); });
    nameInput.addEventListener("blur", () => { if (nameInput.value.trim()) setErr("name", nameError(nameInput.value.trim())); });
    nameInput.addEventListener("input", () => { if (nameInput.hasAttribute("aria-invalid") && !nameError(nameInput.value.trim())) setErr("name", ""); });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim().replace(/\s+/g, " ");
      const phone = cleanPhone(String(fd.get("phone") || ""));
      const need = String(fd.get("need") || "");
      const details = String(fd.get("details") || "").trim();

      const okName = setErr("name", nameError(name));
      const okPhone = setErr("phone", phoneError(phone));
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
