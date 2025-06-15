import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    postName: String,
    metaTitle: String,
    department: String,
    categoryNumber: String,
    salary: String,
    vacancyNumber: String,
    appointment: String,
    ageLimit: String,
    notificationDate: String,
    lastDate: String,
    education: String,
    imageUrl: String,
    jobDescription: String,
    metaDescription: String,
    eligble: String,
    metaKeywords: [String], // 👈 Array of keywords
  },
  { timestamps: true }
);

const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);
export default Job;