import { Landing } from "../components/Landing";
import { landingMeta } from "../lib/seo";
import { ECOM } from "../pages";

export function meta() {
  return landingMeta(ECOM);
}

/** Static landing page: no client-side React; behaviour comes from app/lib/enhance.ts */
export const handle = { hydrate: false };

export default function EcommercePage() {
  return <Landing page={ECOM} />;
}
