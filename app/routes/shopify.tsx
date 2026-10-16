import { Landing } from "../components/Landing";
import { landingMeta } from "../lib/seo";
import { SHOPIFY } from "../pages";

export function meta() {
  return landingMeta(SHOPIFY);
}

/** Static landing page: no client-side React; behaviour comes from app/lib/enhance.ts */
export const handle = { hydrate: false };

export default function ShopifyPage() {
  return <Landing page={SHOPIFY} />;
}
