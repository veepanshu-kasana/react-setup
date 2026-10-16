import { SITE } from "../site";
import type { Page } from "../pages/types";

/** Meta tags + JSON-LD for one landing page. */
export function landingMeta(page: Page) {
  const pageUrl = `${SITE.url}${page.path === "/" ? "/" : page.path}`;
  const ogImage = `${SITE.url}${page.seo.ogImage}`;
  const { title, description } = page.seo;

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
        name: title,
        description,
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
          { "@type": "ListItem", position: 2, name: page.seo.serviceName, item: pageUrl },
        ],
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: page.seo.serviceName,
        serviceType: "E-commerce website development",
        description,
        provider: { "@id": `${SITE.mainSite}/#organization` },
        areaServed: { "@type": "Country", name: "India" },
        url: pageUrl,
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: page.c.FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
    { tagName: "link", rel: "canonical", href: pageUrl },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "en_IN" },
    { property: "og:site_name", content: SITE.brand },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: pageUrl },
    { property: "og:image", content: ogImage },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: page.seo.ogAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
    { "script:ld+json": jsonLd },
  ];
}
