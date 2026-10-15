import type { Route } from "./+types/home";
import { Landing } from "../components/Landing";
import { SEO, SITE } from "../site";
import { FAQS } from "../content";

const pageUrl = `${SITE.url}/`;
const ogImage = `${SITE.url}${SEO.ogImage}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE.mainSite}/#organization`,
      name: SITE.brand,
      url: SITE.mainSite,
      telephone: SITE.phoneE164,
      email: SITE.email,
      image: ogImage,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.region,
        postalCode: SITE.address.postalCode,
        addressCountry: SITE.address.country,
      },
      areaServed: { "@type": "Country", name: "India" },
      sameAs: [SITE.social.facebook, SITE.social.instagram],
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: SEO.title,
      description: SEO.description,
      inLanguage: "en-IN",
      isPartOf: { "@type": "WebSite", url: SITE.mainSite, name: SITE.brand },
      primaryImageOfPage: ogImage,
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      about: { "@id": `${pageUrl}#service` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.mainSite}/` },
        { "@type": "ListItem", position: 2, name: "WooCommerce Website Development", item: pageUrl },
      ],
    },
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: "WooCommerce Website Development",
      serviceType: "E-commerce website development",
      description: SEO.description,
      provider: { "@id": `${SITE.mainSite}/#organization` },
      areaServed: { "@type": "Country", name: "India" },
      url: pageUrl,
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: SEO.title },
    { name: "description", content: SEO.description },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
    { tagName: "link", rel: "canonical", href: pageUrl },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "en_IN" },
    { property: "og:site_name", content: SITE.brand },
    { property: "og:title", content: SEO.title },
    { property: "og:description", content: SEO.description },
    { property: "og:url", content: pageUrl },
    { property: "og:image", content: ogImage },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "WooCommerce website development in India by RannLab Technologies" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: SEO.title },
    { name: "twitter:description", content: SEO.description },
    { name: "twitter:image", content: ogImage },
    { "script:ld+json": jsonLd },
  ];
}

/** Static landing page: no client-side React; behaviour comes from app/lib/enhance.ts */
export const handle = { hydrate: false };

export default function Home() {
  return <Landing />;
}
