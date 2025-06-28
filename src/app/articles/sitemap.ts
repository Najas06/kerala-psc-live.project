import dbConnect from "@/lib/db";
import Article from "@/lib/models/article";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_DOMAIN || "https://www.keralapsclive.com";
  let articles = [];
  await dbConnect();
  try {
    articles = await Article.find().lean().sort({ createdAt: -1 });
  } catch (error) {
    console.error(`Error fetching articles: ${error}`);
    return [];
  }

  const sitemapItems: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/articles/${article._id}`,
    lastModified: article.createdAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  return sitemapItems;
}
