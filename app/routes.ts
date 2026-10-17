import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("shopify-development", "routes/shopify.tsx"),
  route("ecommerce-development", "routes/ecommerce.tsx"),
  route("thank-you", "routes/thank-you.tsx"),
  // Server-side lead intake (signs and forwards leads to RannCX)
  route("api/lead", "routes/api.lead.ts"),
] satisfies RouteConfig;
