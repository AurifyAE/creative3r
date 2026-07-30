import type { MetadataRoute } from "next";
import { services } from "./(main)/services/servicesData";
import { portfolioItems } from "./(main)/portfolio/portfolioData";
import { SITE_URL } from "./robots";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/services", priority: 0.9 },
    { path: "/portfolio", priority: 0.9 },
    { path: "/teams", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/ls-connect", priority: 0.4 },
    { path: "/ls-connect/privacy-policy", priority: 0.2 },
    { path: "/ls-connect/terms", priority: 0.2 },
    { path: "/ls-connect/data-deletion", priority: 0.2 },
  ];

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...services.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...portfolioItems.map((item) => ({
      url: `${SITE_URL}/portfolio/${item.id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
