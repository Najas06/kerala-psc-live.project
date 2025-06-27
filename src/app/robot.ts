import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/dashboard/"],
    },
    sitemap: [
      `${process.env.NEXT_PUBLIC_DOMAIN}/sitemap.xml`,
      `${process.env.NEXT_PUBLIC_DOMAIN}/sitemap-0.xml`,
    ],
  };
}
