import { EmailTemplate } from "@/components/email-template";
import dbConnect from "@/lib/db";
import Subscriber from "@/lib/models/subscribe";
import Job from "@/lib/models/job";
import { Resend } from "resend";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Define a simple email validation regex.
// This regex is a good balance between strictness and common email formats.
// For extremely strict validation (RFC 5322), consider a dedicated library.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Define a chunk size for sending emails.
// While not strictly needed for 19 subscribers, it's a best practice for scalability.
// Resend's 'to' array limit is typically 50. Setting it to 50 is safe.
const CHUNK_SIZE = 50;

export async function POST(req: Request) {
  // Added 'req: Request' for better typing in Next.js API routes
  try {
    await dbConnect();

    // 1. Fetch data efficiently:
    // Fetch all subscribers. For larger lists, you'd implement pagination here
    // using .skip().limit() in a loop to avoid loading all into memory.
    const subscribers = await Subscriber.find({}).select("email").lean(); // Optimize: select only 'email', return lean objects

    // Fetch latest 5 jobs (this part is already efficient)
    const latestJobs = await Job.find().sort({ createdAt: -1 }).limit(5); // Optimize: return lean objects

    // 2. Prepare recipient emails with robust validation and deduplication:
    const rawToEmails = subscribers.map((s) => s.email);

    const validToEmails = [
      ...new Set(
        rawToEmails.filter(
          (email) =>
            email && typeof email === "string" && EMAIL_REGEX.test(email)
        )
      ),
    ];

    if (validToEmails.length === 0) {
      console.warn(
        "No valid subscriber emails found after filtering. Aborting email send."
      );
      return Response.json(
        { success: false, message: "No valid subscriber emails to send." },
        { status: 400 } // Bad Request, as there's nothing to send
      );
    }

    // 3. Prepare the email content:
    // Ensure EmailTemplate receives the correct props and renders valid HTML.
    const emailReactComponent = EmailTemplate({ jobs: latestJobs });

    // 4. Batch send emails (even for small lists, this pattern is scalable):
    const sentResults = [];
    const failedSends = [];
    let successfulEmailCount = 0;

    for (let i = 0; i < validToEmails.length; i += CHUNK_SIZE) {
      const chunk = validToEmails.slice(i, i + CHUNK_SIZE);
      console.log(
        `Attempting to send email chunk ${Math.floor(i / CHUNK_SIZE) + 1} to ${chunk.length} recipients.`
      );

      try {
        const { data, error } = await resend.emails.send({
          from: "Kerala PSC Live <noreply@keralapsclive.com>",
          to: chunk,
          subject: "📢 Latest Kerala PSC Job Alerts",
          react: emailReactComponent, // Reuse the rendered React component
        });

        if (error) {
          console.error(
            `Error sending email chunk starting from index ${i}:`,
            error
          );
          failedSends.push({
            chunkStartIndex: i,
            error: error.message,
            chunkRecipients: chunk,
          });
        } else {
          console.log(
            `Successfully submitted email chunk starting from index ${i}. Resend data:`,
            data
          );
          sentResults.push(data);
          successfulEmailCount += chunk.length; // Count emails in the chunk
        }
      } catch (chunkSendException) {
        console.error(
          `Exception caught during email chunk send starting from index ${i}:`,
          chunkSendException
        );
        failedSends.push({
          chunkStartIndex: i,
          error: (chunkSendException as Error).message || "Unknown exception",
          chunkRecipients: chunk,
        });
      }

      // Optional: Add a small delay between chunks to avoid hitting rate limits
      // Resend has a default rate limit of 2 requests/second. Adjust as needed.
      // await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
    }

    // 5. Provide a comprehensive response:
    if (failedSends.length > 0) {
      return Response.json(
        {
          success: false,
          message: `Email sending process completed with some errors. Total emails submitted: ${successfulEmailCount}. Failed chunks: ${failedSends.length}.`,
          submittedData: sentResults,
          failedDetails: failedSends,
        },
        { status: 207 } // 207 Multi-Status: Indicates partial success
      );
    } else {
      return Response.json(
        {
          success: true,
          message: `${successfulEmailCount} emails successfully submitted to Resend across ${sentResults.length} API calls.`,
          data: sentResults,
        },
        { status: 200 }
      );
    }
  } catch (overallError) {
    console.error("Overall API route error:", overallError);
    return Response.json(
      {
        error:
          (overallError as Error).message ||
          "An unexpected server error occurred.",
      },
      { status: 500 }
    );
  }
}
