import type { Config } from "@react-router/dev/config";

export default {
  // Server-side render, and pre-render the landing page to static HTML at build time
  // for the fastest possible TTFB / LCP.
  ssr: true,
  prerender: ["/"],
} satisfies Config;
