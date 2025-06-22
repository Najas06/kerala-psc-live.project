import ArticleCard from "@/components/ArticleCard";
import ChooseCard from "@/components/ChooseCard";
import { GetDailyAlertBtn } from "@/components/GetDailyAlertBtn";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PostCard from "@/components/PostCard";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import dbConnect from "@/lib/db";
import Article from "@/lib/models/article";
import Job from "@/lib/models/job";
import {
  CircleHelp,
  ClockFading,
  MonitorSmartphone,
  ShieldCheck,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
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
        url: "https://wjgczpg1md.ufs.sh/f/IpV2ESqqMQ4e1MMQUojK2iKBQhkSjOu7wH6rqTpJAaFgeYt0",
        width: 800,
        height: 600,
        alt: "Kerala PSC Live",
      },
    ],
  },
};

export default async function Home() {
  await dbConnect();

  const latestJobs = await Job.find().sort({ createdAt: -1 }).limit(8);

  const latestArticles = await Article.find().sort({ createdAt: -1 }).limit(3);

  return (
    <div className="bg-slate-50">
      {/* // banner section */}
      <section className="relative">
        <MaxWidthWrapper className="relative ">
          <div className="relative w-full mt-3">
            {/* Background Image */}
            <div className="relative w-full h-[250px] md:h-[400px]">
              <Image
                src="/bgBanner.jpg"
                alt="Kerala PSC Job Alert Banner"
                fill
                className="object-cover rounded-2xl opacity-90"
                priority
                sizes="100vw"
              />
            </div>

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
            <h1 className="text-xl tracking-tighter px-2">
              New Jobs Alert{" "}
              <span className="text-green-600 underline font-semibold">{`${new Date().toDateString()}`}</span>
            </h1>

            {/* card section  */}
            <div className="flex justify-center">
              <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5  ">
                {/* {dummyData.slice(0, 8).map((job, index) => (
                  <PostCard key={index} {...job} />
                ))} */}
                {latestJobs
                  ? latestJobs?.map((job, index) => (
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
            <Link href={"https://t.me/keralapsclive0612"} target="_blank">
              <div className="flex justify-center gap-x-3 items-center py-5  max-w-[300px] mx-auto font-semibold uppercase rounded-full">
                Join Our Community{" "}
                <Image
                  width={40}
                  height={40}
                  src="/telegram-icon.png"
                  alt="telegram icon"
                  className="w-10 h-10"
                />{" "}
                {/* <img src="/whatsapp-icon.png" alt="whatsapp" className="w-10" /> */}
              </div>
            </Link>
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

              {latestArticles.map((item, index) => (
                <ArticleCard
                  key={index}
                  imageUrl={item.imageUrl}
                  metaDescription={item.metaDescription}
                  title={item.title}
                />
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
