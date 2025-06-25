import * as z from "zod";


const jobSchema = z.object({
  postName: z.string().trim().trim().min(1, "Post Name is required"), // Added validation messages
  metaTitle: z.string().trim().min(1, "Meta Title is required"),
  department: z.string().trim().min(1, "Department is required"),
  categoryNumber: z.string().trim().min(1, "Category Number is required"),
  salary: z.string().trim().min(1, "Salary is required"),
  vacancyNumber: z.string().trim().min(1, "Vacancy Number is required"),
  appointment: z.string().trim().min(1, "Appointment method is required"),
  ageLimit: z.string().trim().min(1, "Age Limit is required"),
  notificationDate: z.string().trim().min(1, "Notification Date is required"),
  lastDate: z.string().trim().min(1, "Last Date is required"),
  education: z.string().optional(), // Made optional, or add min(1) if required
  imageUrl: z.string().optional(), // Made optional, or add min(1) if required
  jobDescription: z.string().optional(), // Made optional, or add min(1) if required
  metaDescription: z.string().optional(), // Made optional, or add min(1) if required
  eligble: z.string().optional(), // Made optional, or add min(1) if required
  metaKeywords: z.preprocess(
  (val) => {
    if (typeof val === "string") {
      return val
        .split(",").map(s => s.trim()).filter(Boolean);
    }
    return val;
  }, z.array(z.string().min(1, "Keyword must be a non-empty string"))
    .min(1, "Minimum 1 Meta Keyword is required")
  ),
    /* type 1 fails
    .array(z.string().trim().min(1, "keyword must be a non-empty string"))
    .min(1, "Minimum 1 Meta Keyword are required") */ // this is atleast 1 array is required

    /* type 2 fails
    .string()
    .trim()
    .min(1, "Meta Keywords are required") // Ensure input string is not empty before transform
    .transform((str) => {
      return str
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean); // Added trim and filter for cleaner keywords
    }), */



});


export default jobSchema;