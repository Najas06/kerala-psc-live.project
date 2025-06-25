"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { SidebarTrigger } from "./ui/sidebar";
import articleSchema from "@/lib/validation/articleSchema";

// Dynamically import MDX editor to prevent SSR issues and ensure client-side rendering
const MdxEditor = dynamic(() => import("@/components/editor/MdxEditor"), {
  ssr: false,
});



// Infer the form type from the Zod schema's output type
type ArticleFormType = z.output<typeof articleSchema>;

export default  function AddArticleForm() {


  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ArticleFormType>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      imageUrl: "", // Set default for imageUrl
      author: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      // content field default value temporarily commented out
      content: "",
    },
  });

  const onSubmit = async (values: ArticleFormType) => {
    setIsSubmitting(true);
    try {
      // console.log("Submitting article values:", values);

      const res = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Article created successfully!");
        form.reset();
      } else {
        toast.error(
          data.message || "Error creating article. Please try again."
        );
      }
    } catch (error: unknown) {
      console.error("Submit error:", error);
      let errorMessage = "An unexpected error occurred during submission.";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <SidebarTrigger className="ml-4" />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-3 space-y-8 max-w-5xl w-full mx-auto py-10 tracking-tighter"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Article Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://image-url.com/your-image.jpg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Author name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="metaTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Title</FormLabel>
              <FormControl>
                <Input placeholder="SEO title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="metaDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Concise SEO meta description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="metaKeywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Keywords</FormLabel>
              <FormControl>
                <Input placeholder="comma,separated,keywords" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Content Field (MDX Editor) - Temporarily commented out */}
        {/* Please uncomment this section and the dynamic import in your local Next.js project */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <MdxEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Publishing..." : "Publish Article"}
        </Button>
      </form>
    </Form>
  );
}
