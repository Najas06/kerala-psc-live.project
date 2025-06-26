// next-sitemap.config.js
const mongoose = require('mongoose');

// ✅ Replace with your real connection string
const MONGODB_URI = process.env.MONGODB_URI ;

module.exports = {
  siteUrl: 'https://www.keralapsclive.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  outDir: 'public',

  // 👇 Dynamically pull slugs from MongoDB
  additionalPaths: async (config) => {
    const paths = [
      '/',
      '/jobs',
      '/articles',
      '/privacy-policy',
      '/contact-us',
      '/syllabus',
    ];

    try {
      // 1. Connect to MongoDB
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        
      }

      // 2. Define models
      const Job = mongoose.model('Job', new mongoose.Schema({}, { strict: false }), 'jobs');
      const Article = mongoose.model('Article', new mongoose.Schema({}, { strict: false }), 'articles');

      // 3. Get all _ids
      const jobDocs = await Job.find({}, '_id').lean();
      const articleDocs = await Article.find({}, '_id').lean();

      // 4. Add dynamic paths
      jobDocs.forEach((job) => paths.push(`/jobs/${job._id}`));
      articleDocs.forEach((article) => paths.push(`/articles/${article._id}`));

    } catch (error) {
      console.error('❌ Error fetching slugs for sitemap:', error);
    }

    return paths.map((loc) => ({
      loc,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));
  },
};