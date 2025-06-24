import { z } from "zod";


// Define the Zod schema for article validation
const articleSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  imageUrl: z.string().trim().url("Invalid image URL").min(1, "Image URL is required"),
  author: z.string().trim().min(1, "Author is required"),
  metaTitle: z.string().trim().min(1, "Meta title is required"),
  metaDescription: z.string().trim().min(1, "Meta description is required"),
  metaKeywords: z
    .array(z.string().trim().min(1, "keyword must be a non-empty string"))
    .min(1, "Minimum 1 Meta Keyword are required"), // this is atleast 1 array is required
    /* .string()
    .trim().min(1, "Meta keywords are required (comma-separated)")
    .transform((value) =>
      value
        .split(",")
        .map((kw) => kw.trim())
        .filter(Boolean)
    ), */
  // content field temporarily commented out for compilation in this environment
  // Please uncomment this in your local Next.js project:
  content: z.string().trim().min(1, "Content is required")
});

export default articleSchema;