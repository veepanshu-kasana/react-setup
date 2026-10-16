import { Landing } from "../components/Landing";
import { landingMeta } from "../lib/seo";
import { WOO } from "../pages";

export function meta() {
  return landingMeta(WOO);
}

/** Static landing page: no client-side React; behaviour comes from app/lib/enhance.ts */
export const handle = { hydrate: false };

export default function Home() {
  return <Landing page={WOO} />;
}
