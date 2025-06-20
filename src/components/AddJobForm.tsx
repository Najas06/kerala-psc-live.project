"use client";
import { useState } from "react"; // <--- Import useState
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SidebarTrigger } from "./ui/sidebar";


const formSchema = z.object({
  postName: z.string().min(1, "Post Name is required"), // Added validation messages
  metaTitle: z.string().min(1, "Meta Title is required"),
  department: z.string().min(1, "Department is required"),
  categoryNumber: z.string().min(1, "Category Number is required"),
  salary: z.string().min(1, "Salary is required"),
  vacancyNumber: z.string().min(1, "Vacancy Number is required"),
  appointment: z.string().min(1, "Appointment method is required"),
  ageLimit: z.string().min(1, "Age Limit is required"),
  notificationDate: z.string().min(1, "Notification Date is required"),
  lastDate: z.string().min(1, "Last Date is required"),
  education: z.string().optional(), // Made optional, or add min(1) if required
  imageUrl: z.string().optional(), // Made optional, or add min(1) if required
  jobDescription: z.string().optional(), // Made optional, or add min(1) if required
  metaDescription: z.string().optional(), // Made optional, or add min(1) if required
  eligble: z.string().optional(), // Made optional, or add min(1) if required
  metaKeywords: z
    .string()
    .min(1, "Meta Keywords are required") // Ensure input string is not empty before transform
    .transform((str) => {
      return str
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean); // Added trim and filter for cleaner keywords
    }),
});

export default  function AddJobForm() {
 
  const [isSubmitting, setIsSubmitting] = useState(false); // <--- Add loading state

  const form = useForm<z.output<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // --- ADD DEFAULT VALUES HERE ---
    defaultValues: {
      postName: "",
      metaTitle: "",
      department: "",
      categoryNumber: "",
      salary: "",
      vacancyNumber: "",
      appointment: "",
      ageLimit: "",
      notificationDate: "",
      lastDate: "",
      education: "",
      imageUrl: "",
      jobDescription: "",
      metaDescription: "",
      eligble: "",
      // For metaKeywords, the default value should be a string because the input expects a string
      // The transform converts it to string[] AFTER validation.
      metaKeywords: "",
    },
    // --- END DEFAULT VALUES ---
  });

  async function onSubmit(values: z.output<typeof formSchema>) {
    setIsSubmitting(true); // Set submitting to true
    try {
      console.log("Submitting values:", values); // Log transformed values
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        // If the server returns an error message, parse and use it
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Failed to submit the form. Please try again."
        );
      }

      toast.success("Job Post submitted successfully.");
      form.reset(); // <--- This is the crucial line to clear the inputs
    } catch (error: unknown | Error) {
      // Type the error
      console.error("Form submission error", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit the form. Please try again."
      );
    } finally {
      setIsSubmitting(false); // Reset submitting to false
    }
  }

  return (
    <Form {...form}>
      <SidebarTrigger className="ml-4" />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" px-3 space-y-8 max-w-5xl w-full mx-auto py-10 tracking-tighter"
      >
        {/* Your FormField components */}
        {/* Input for Job title */}
        <FormField
          control={form.control}
          name="postName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of Post</FormLabel>
              <FormControl>
                <Input placeholder="Enter Job name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Input for meta title */}
        <FormField
          control={form.control}
          name="metaTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Title</FormLabel>
              <FormControl>
                <Input placeholder="Meta title for SEO" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Input for department and category */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Department</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Department name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="categoryNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Category Number"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Input for salary and vacancy number */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scale of pay</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Scale of pay"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="vacancyNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Vacancy</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Number of vacancy"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Input for appointment and age limit */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="appointment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Method of Appointment</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg: Direct Recruitment"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="ageLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age Limit</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: 22 - 40" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Input for notification and last dates */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="notificationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notification Date</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg : Job published date"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="lastDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Date of Application</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg : Last date of application"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Image URL Input */}
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Upload image URL" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Education Level Select */}
        <FormField
          control={form.control}
          name="education"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Education Level</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                {" "}
                {/* Use 'value' instead of 'defaultValue' for controlled component */}
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Education Level of application" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="10th pass">10th pass</SelectItem>
                  <SelectItem value="12th pass">12th pass</SelectItem>
                  <SelectItem value="Degree">Any Degree</SelectItem>
                  <SelectItem value="Post Graduation">
                    Any Post Graduation
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Description Textarea */}
        <FormField
          control={form.control}
          name="jobDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Job Description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Meta Description Textarea */}
        <FormField
          control={form.control}
          name="metaDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Meta description for SEO"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Eligible Criteria Textarea */}
        <FormField
          control={form.control}
          name="eligble"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Eligible Criteria</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Minimum Requirement like education, certificate, diploma etc..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Meta Keywords Input */}
        <FormField
          control={form.control}
          name="metaKeywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Keywords</FormLabel>
              <FormControl>
                <Input placeholder="Comma-separated keywords" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}{" "}
          {/* <--- Disable button during submission */}
        </Button>
      </form>
    </Form>
  );
}
