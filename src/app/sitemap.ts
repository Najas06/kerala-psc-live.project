import { MetadataRoute } from "next";
import connectDB from "@/lib/db";
import Job from "@/lib/models/job";
import Article from "@/lib/models/article";

export const revalidate = 3600; // regenerate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB();

  const jobs = await Job.find({}, "slug createdAt").lean();
  const articles = await Article.find({}, "slug createdAt").lean();

  const domain =
    process.env.NEXT_PUBLIC_DOMAIN || "https://www.keralapsclive.com";

  const jobPaths: MetadataRoute.Sitemap = jobs.map((j) => ({
    url: `${domain}/jobs/${j._id}`,
    lastModified: j.createdAt,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const articlePaths: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${domain}/articles/${a._id}`,
    lastModified: a.createdAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: domain + "/",
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: domain + "/jobs",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: domain + "/articles",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...jobPaths,
    ...articlePaths,
  ];
}
