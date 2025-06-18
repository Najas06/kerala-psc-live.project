import ArticleCard from "@/components/ArticleCard";
import ChooseCard from "@/components/ChooseCard";
import { GetDailyAlertBtn } from "@/components/GetDailyAlertBtn";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PostCard from "@/components/PostCard";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { JobResponse } from "@/types/type";
import {
  CircleHelp,
  ClockFading,
  MonitorSmartphone,
  ShieldCheck,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kerala PSC Live - Jobs Notifications & Alerts 2025",
  description:
    "Get the latest Kerala PSC Jobs alerts, live notifications, and exam updates in one place. stay a head with PSC Job posts and applications links.",
  keywords: [
    "Kerala PSC jobs",
    "Kerala PSC notification 2025",
    "10th pass jobs Kerala",
    "12th pass jobs Kerala",
    "Degree jobs Kerala",
    "Post Graduation jobs Kerala",
    "PSC live updates",
    "Kerala Government jobs",
    "PSC alerts",
    "Kerala PSC articles",
    "Degree jobs Kerala",
    "PSC latest news",
    "Kerala PSC Live",
  ],
  openGraph: {
    title: "Kerala PSC Live - Jobs Notifications & Alerts 2025",
    description:
      "Get the latest Kerala PSC Jobs alerts, live notifications, and exam updates in one place. stay a head with PSC Job posts and applications links.",
    url: "keralapsclive.com",
    siteName: "Kerala PSC Live",
    images: [
      {
        url: "https://wjgczpg1md.ufs.sh/f/IpV2ESqqMQ4eyE6fSwhESegmW9ClBNc5i7OGp3V2z8KMqrRd",
        width: 800,
        height: 600,
        alt: "Kerala PSC Live",
      },
    ],
  },
};

export default async function Home() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  const job = await fetch(`${baseUrl}/api/jobs`, {
    cache: "no-cache",
  });
  // const jobsData = false;
  const jobsData: JobResponse = await job.json();
  // console.log(jobsData.degreeLevel.length);

  return (
    <div className="bg-slate-50">
      {/* // banner section */}
      <section className="relative">
        <MaxWidthWrapper className="relative ">
          <div className="relative w-full mt-3">
            {/* Background Image */}
            <img
              src="/bgBanner.jpg"
              alt="Banner"
              className="w-full h-[250px] md:h-[400px] object-cover rounded-2xl opacity-90"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 rounded-2xl" />

            {/* Content */}
            <div className="absolute top-0 w-full text-white/80 md:top-16">
              <h1 className="text-center font-medium text-xl mt-10 md:text-3xl lg:text-5xl ">
                Stay Updated with Latest <br />
                Kerala PSC notifications
              </h1>
              <h2 className="text-center mt-2 font-light px-2 md:text-xl lg:text-2xl">
                Your one-stop destination for all Kerala Public Service
                Commision job alerts
              </h2>
              <div className="flex justify-center mt-5">
                {/* <Button
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Get Daily Alerts <MoveRight />
                </Button> */}
                <GetDailyAlertBtn />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* new update  */}
      <section>
        <MaxWidthWrapper>
          <div className="py-5 md:py-10">
            <h1 className="text-sm md:text-xl tracking-tighter  px-2">
              New Jobs Alert{" "}
              <span className="text-green-600 underline font-semibold">{`${new Date().toDateString()}`}</span>
            </h1>

            {/* card section  */}
            <div className="flex justify-center">
              <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
                {/* {dummyData.slice(0, 8).map((job, index) => (
                  <PostCard key={index} {...job} />
                ))} */}
                {jobsData
                  ? jobsData.latestJobs?.map((job, index) => (
                      <PostCard key={index} job={job} />
                    ))
                  : Array.from({ length: 8 }).map((_ /*_item*/, index) => (
                      <div className="flex flex-col space-y-3" key={index}>
                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                      </div>
                    ))}
              </div>
            </div>
            <div className="flex py-2 border-b justify-center items-center">
              <Link href="/jobs" className={buttonVariants({ size: "lg" })}>
                View All Jobs
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* why choose section  */}
      <section>
        <MaxWidthWrapper>
          <h3 className="text-center text-2xl py-3 font-semibold tracking-tight md:text-3xl">
            Why choose us ?
          </h3>

          <div className="flex justify-center py-5">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {whyChooseDummyData.map((card, index) => (
                <ChooseCard key={index} {...card} />
              ))}
            </div>
          </div>
          <h3 className="px-3 my-5 font-light md:text-lg text-sm ">
            We provide up-to-date and accurate information on{" "}
            <span className="text-green-600 font-semibold underline">
              Kerala PSC Jobs{" "}
            </span>
            openings, ensuring you never miss an opportunity.
          </h3>
          <div className="border-b" />
        </MaxWidthWrapper>
      </section>

      {/* article section  */}
      <section>
        <MaxWidthWrapper>
          <div className="py-5 md:py-10">
            <h1 className="text-sm md:text-xl tracking-tighter  px-2">
              Latest Articles{" "}
              <span className="text-green-600 underline font-semibold">
                Kerala PSC Jobs
              </span>
            </h1>

            {/* article card  */}
            <div className=" my-5">
              {/* article card components items  */}

              {dummyData.slice(0, 4).map((item, index) => (
                <ArticleCard key={index} {...item} />
              ))}

              <div className="flex py-2  justify-center items-center">
                <Link
                  href="/articles"
                  className={buttonVariants({ size: "lg" })}
                >
                  View All Articles
                </Link>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}

const dummyData = [
  {
    title: "Assistant Prison Officer",
    description:
      "Direct recruitment to the Kerala Prisons Department. Physical test required.",
    lastDate: "2025-06-30",
  },
  {
    title: "Junior Health Inspector Grade II",
    description:
      "Vacancies under the Health Services Department. Must have Health Inspector diploma.",
    lastDate: "2025-07-05",
  },
  {
    title: "Lower Division Clerk (LDC)",
    description:
      "District-wise recruitment. SSLC pass required. Typing speed desirable.",
    lastDate: "2025-06-25",
  },
  {
    title: "Village Field Assistant",
    description:
      "Recruitment under Revenue Department. Matriculation required.",
    lastDate: "2025-07-15",
  },
  {
    title: "High School Teacher (Maths) – Malayalam Medium",
    description:
      "Recruitment in Education Department. B.Ed and K-TET required.",
    lastDate: "2025-06-28",
  },
  {
    title: "Police Constable (Armed Police Battalion)",
    description:
      "Only for male candidates. Physical efficiency test mandatory.",
    lastDate: "2025-07-01",
  },
  {
    title: "Assistant Grade II – Kerala State Co-operative Bank",
    description: "Commerce degree and computer knowledge preferred.",
    lastDate: "2025-07-10",
  },
  {
    title: "Typist Clerk / Clerk Typist",
    description: "Typing test and knowledge of Malayalam required.",
    lastDate: "2025-06-27",
  },
  {
    title: "Lecturer in Electronics Engineering – Polytechnic Colleges",
    description: "First class Bachelor's Degree in Engineering mandatory.",
    lastDate: "2025-07-18",
  },
  {
    title: "Staff Nurse Grade II",
    description:
      "GNM or BSc Nursing required. Posting under Health Department.",
    lastDate: "2025-06-29",
  },
];

const whyChooseDummyData = [
  {
    title: "Real-Time Updates",
    description:
      "Get instant notifications for new job posting and exam alerts",
    icon: (
      <ClockFading
        size={80}
        className="  rounded-full text-green-600 p-4 bg-[#E6FFFA]"
      />
    ),
  },
  {
    title: "Verified Job Listing",
    description:
      "All Jobs are sourced directly from official Kerala PSC website",
    icon: (
      <ShieldCheck
        size={80}
        className="rounded-full text-green-600 p-4 bg-[#E6FFFA]"
      />
    ),
  },
  {
    title: "User-friendly Interface",
    description:
      "Easily navigate and find the information you need, hassle free",
    icon: (
      <MonitorSmartphone
        size={80}
        className="rounded-full text-green-600 p-4 bg-[#E6fffa]"
      />
    ),
  },
  {
    title: "Dedicated Support",
    description: "Our team is here to assist you with any questions or issues",
    icon: (
      <CircleHelp
        size={80}
        className="rounded-full text-green-600 p-4 bg-[#E6FFFA]"
      />
    ),
  },
];
