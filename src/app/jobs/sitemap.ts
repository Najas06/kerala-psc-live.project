import dbConnect from "@/lib/db";
import Job from "@/lib/models/job";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_DOMAIN || "https://www.keralapsclive.com";
  let jobs = [];
  await dbConnect();
  try {
    jobs = await Job.find().lean().sort({ createdAt: -1 });
  } catch (error) {
    console.error(`Error fetching articles: ${error}`);
    return [];
  }

  const sitemapItems: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${baseUrl}/jobs/${job._id}`,
    lastModified: job.createdAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  return sitemapItems;
}
