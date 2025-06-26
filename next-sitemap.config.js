const fetch = require("node-fetch");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.keralapsclive.com",
  generateRobotsTxt: true,
  sitemapSize: 500, // if > 500 URLs, splits into sitemap-0.xml, sitemap-1.xml, etc.
  outDir: "./public",
  experimental: {
    appDir: true,
  },
  exclude: ["/dashboard/*", "/api/*"], // optional
  additionalPaths: async (config) => {
    const jobRes = await fetch.default(`${config.siteUrl}/api/jobs`);
    const articleRes = await fetch.default(`${config.siteUrl}/api/articles`);

    const jobs = await jobRes.json();
    const articles = await articleRes.json();

    const jobPaths = jobs.data.map((job) => ({
      loc: `/jobs/${job._id}`,
      lastmod: job.updatedAt || new Date().toISOString(),
    }));

    const articlePaths = articles.data.map((article) => ({
      loc: `/articles/${article._id}`,
      lastmod: article.updatedAt || new Date().toISOString(),
    }));

    return [...jobPaths, ...articlePaths];
  },
};
