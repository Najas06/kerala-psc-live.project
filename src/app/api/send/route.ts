import { EmailTemplate } from "@/components/email-template";
import dbConnect from "@/lib/db";
import Subscriber from "@/lib/models/subscribe";
import Job from "@/lib/models/job";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    await dbConnect();

    // Fetch recent 100 subscribers (optional for sending to all)
    const subscribers = await Subscriber.find()
      .sort({ createdAt: -1 })
      .limit(100);

    // Fetch latest 5 jobs
    const latestJobs = await Job.find().sort({ createdAt: -1 }).limit(5);

    const toEmails = subscribers.map((s) => s.email); // assuming schema has email

    const { data, error } = await resend.emails.send({
      from: "Kerala PSC Live <noreply@keralapsclive.com>",
      to: toEmails,
      subject: "📢 Latest Kerala PSC Job Alerts",
      react: EmailTemplate({ jobs: latestJobs }),
    });

    if (error) return Response.json({ error }, { status: 500 });

    return Response.json(
      { success: true, data, message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
