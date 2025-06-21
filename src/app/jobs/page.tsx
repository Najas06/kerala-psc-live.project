import { JobTable } from "@/components/JobTable";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { capatilize } from "@/lib/utils";
import { JobResponse } from "@/types/type";
import { GraduationCap } from "lucide-react";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  return {
    title: `Kerala PSC Live - ${slug ? capatilize(slug) : "All"} Jobs`,
    description:
      "Explore live Kerala PSC job notifications categorized by education level. Find 10th, 12th, Degree, and Post Graduation job openings, eligibility, and application links – all in one place.",
    keywords: [
      "Kerala PSC live",
      "Kerala PSC notifications",
      "Kerala PSC recruitment",
      "Kerala PSC jobs 2025",
      "Kerala PSC syllabus",
      "Kerala PSC result",
      "Kerala government jobs",
      "PSC exam details",
      "10th pass Kerala jobs",
      "12th pass PSC jobs",
      "Degree level PSC posts",
      "Post graduation PSC recruitment",
      "PSC job updates Kerala",
      "Kerala Public Service Commission",
      "Kerala PSC June Exam 2025",
    ],
  };
}

export default async function Page() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const job = await fetch(`${baseUrl}/api/jobs`, {
    cache: "no-store",
  });
  const jobsData: JobResponse = await job.json();
  // const jobsData = false;
  return (
    <div>
      <section>
        <MaxWidthWrapper>
          <div className="tracking-tight my-8">
            <h2 className="text-3xl font-semibold">All Job Listings</h2>
            <p className="font-light text-sm text-green-600">
              Explore all available jobs listings categorized by education
              level.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-medium flex items-center tracking-tighter gap-x-2 py-4 border-b mb-5">
              <GraduationCap className="text-green-600 mr-1 w-9 h-9" /> 10th
              Pass
            </h2>
            <JobTable title="10th Pass" data={jobsData.tenthLevel} />
          </div>
        </MaxWidthWrapper>
      </section>
      <section>
        <MaxWidthWrapper>
          <h2 className="text-2xl font-medium flex items-center tracking-tighter gap-x-2 py-4 border-b mb-5">
            <GraduationCap className="text-green-600 mr-1 w-9 h-9" /> 12th Pass
          </h2>
          <JobTable title="12th Pass" data={jobsData.twelfthLevel} />
        </MaxWidthWrapper>
      </section>
      <section>
        <MaxWidthWrapper>
          <h2 className="text-2xl font-medium flex items-center tracking-tighter gap-x-2 py-4 border-b mb-5">
            <GraduationCap className="text-green-600 mr-1 w-9 h-9" /> Degree
            Pass
          </h2>
          <JobTable title="Degree Pass" data={jobsData.degreeLevel} />
        </MaxWidthWrapper>
      </section>
      <section>
        <MaxWidthWrapper>
          <h2 className="text-2xl font-medium flex items-center tracking-tighter gap-x-2 py-4 border-b mb-5">
            <GraduationCap className="text-green-600 mr-1 w-9 h-9" /> Post
            Graduation Pass
          </h2>
          <JobTable title="Post Graduation Pass" data={jobsData.degreeLevel} />
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
