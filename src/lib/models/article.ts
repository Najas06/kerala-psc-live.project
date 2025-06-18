import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: String,
    imageUrl: String,
    author: String,
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String], // 👈 Array of keywords
    content: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Article ||
  mongoose.model("Article", articleSchema);
