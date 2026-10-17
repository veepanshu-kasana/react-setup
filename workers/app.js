// Cloudflare Workers entry: serves the React Router SSR build.
// Static assets and prerendered pages are served directly from build/client
// (see "assets" in wrangler.jsonc); everything else (e.g. POST /api/lead) lands here.
import { createRequestHandler } from "react-router";
import * as build from "../build/server/index.js";

const handler = createRequestHandler(build, "production");

export default {
  async fetch(request) {
    return handler(request);
  },
};
