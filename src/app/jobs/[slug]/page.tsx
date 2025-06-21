import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { Job, SingleJobResponse } from "@/types/type";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const res = await fetch(`${baseUrl}/api/jobs/${slug}`);
  const { data }: SingleJobResponse = await res.json();
  const job: Job = data;

  return {
    title: `Kerala PSC Live - ${job.postName || "Job Details"}`,
    description: job.metaDescription,
    keywords: job.metaKeywords,
    openGraph: {
      title: `Kerala PSC Live - ${job.postName}`,
      description: job.metaDescription,
      images: [{ url: job.imageUrl }],
      url: `${baseUrl}/jobs/${slug}`,
      type: "article",
    },
  };
}

const page = async ({ params }: Props) => {
  const { slug } = params;
  const res = await fetch(`${baseUrl}/api/jobs/${slug}`, {
    next: { revalidate: 3600 },
  });
  const { data }: SingleJobResponse = await res.json();
  const job: Job = data;

  return (
    <div>
      <section className="my-10">
        <MaxWidthWrapper>
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbLink asChild>
                  <Link href={"/"} className="text-green-600">
                    Home
                  </Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
                <BreadcrumbLink asChild>
                  <Link href={"/jobs"} className="text-green-600">
                    Jobs
                  </Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
                <BreadcrumbLink asChild>
                  <span className="font-medium text-gray-500">
                    {job.postName}
                  </span>
                </BreadcrumbLink>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div
            className="py-5 px-3 md:px-5 border rounded-xl bg-white my-6 tracking-tight text-neutral-800
          "
          >
            <h1 className="text-3xl  font-semibold">{job.postName}</h1>
            <h3 className="my-2 text-neutral-700 ">
              Application Last Date :{" "}
              <span className="text-red-700 font-medium">{job.lastDate}</span>
            </h3>
            <p className="text-xl font-medium py-3">Overview</p>
            <div className="grid grid-cols-4 my-5 gap-x-3">
              <div className="col-span-2 md:col-span-1 py-3 border-t">
                <p className="text-green-600">Department</p>
                <h3>{job.department}</h3>
              </div>
              <div className="col-span-2 md:col-span-3 py-3 border-t">
                <p className="text-green-600">Category No</p>
                <h3>{job.categoryNumber}</h3>
              </div>
              <div className="col-span-2 md:col-span-1 py-3 border-t">
                <p className="text-green-600">Scale of Pay</p>
                <h3>{job.salary}</h3>
              </div>
              <div className="col-span-2 md:col-span-3 py-3 border-t">
                <p className="text-green-600">Number of Vacancies</p>
                <h3>{job.vacancyNumber}</h3>
              </div>
              <div className="col-span-2 md:col-span-1 py-3 border-t">
                <p className="text-green-600">Method of Appointment</p>
                <h3>{job.appointment}</h3>
              </div>
              <div className="col-span-2 md:col-span-3 py-3 border-t">
                <p className="text-green-600">Age limit</p>
                <h3>{job.ageLimit}</h3>
              </div>
            </div>

            <p className="text-xl font-medium py-3">Important Dates</p>
            <div className="grid grid-cols-4 my-5 gap-x-3">
              <div className="col-span-2 md:col-span-1 py-3 border-t">
                <p className="text-green-600">Notification Date</p>
                <h3>{job.notificationDate}</h3>
              </div>
              <div className="col-span-2 md:col-span-3 py-3 border-t">
                <p className="text-red-700">Last Date</p>
                <time dateTime={job.lastDate}>{job.lastDate}</time>
              </div>
            </div>
            <div className="my-3 flex flex-col gap-y-3">
              <p className="text-xl font-semibold py-3 border-b">
                Job Description
              </p>
              <h3>{job.jobDescription}</h3>
            </div>
            <div className="my-3 flex flex-col gap-y-3">
              <p className="text-xl font-semibold py-3 border-b">
                Eligibility Criteria
              </p>
              <h3>{job.eligble}</h3>
            </div>
            <div className="my-3 flex flex-col gap-y-3">
              <p className="text-xl font-semibold py-3 border-b">
                How to Apply 🧑‍💻👩‍💻 ?
              </p>
              <p>
                Interested and eligible candidates are required to apply online
                through the official Kerala Public Service Commission - PSC
                website{" "}
                <Link
                  href="https://www.keralapsc.gov.in/"
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.keralapsc.gov.in/
                </Link>
              </p>
              <p>Follow these steps 😊 :</p>
              <ul className="list-decimal px-4">
                <li>
                  Visit the official{" "}
                  <Link
                    href="https://thulasi.psc.kerala.gov.in/thulasi/"
                    className="text-blue-600 underline"
                    target="_blank"
                  >
                    Kerala PSC website.
                  </Link>
                </li>
                <li>
                  Register an account if you are a new user. Existing user can
                  log in with their credentials.
                </li>
                <li>{`Navigate to the "Notifications" section and find the notification for ${job.postName}.`}</li>
                <li>
                  Click on &quot;Apply Now&quot; and fill in the required
                  details accurately.
                </li>
                <li>
                  Upload scanned copies of necessary documents, including
                  educational certificates (eg: NET/Ph.D certificate and other
                  relevant documents).
                </li>
                <li>Review the application form before final submission.</li>
                <li>
                  Submit the application form and note down the application
                  number for future reference.
                </li>
              </ul>
            </div>

            <div className="my-3 flex flex-col gap-y-3">
              <p className="text-xl font-semibold py-3 border-b">
                Contact Information
              </p>
              <p>
                For any inquiries or assistance regarding the application
                process, please contact the Kerala Public Service Commision
                through the following channel:
              </p>
              <p>
                <strong>Phone : </strong>0471-2447201
              </p>
              <p>
                <strong>Email : </strong>kpsc.psc@kerala.gov.in
              </p>
              <p>
                <strong>Address : </strong>Kerala Public Service Commission,
                Government House, Thiruvananthapuram, Kerala 695004
              </p>
            </div>

            <div className="flex justify-end">
              <Link
                className={buttonVariants({ variant: "default" })}
                href="https://thulasi.psc.kerala.gov.in/thulasi"
                target="_blank"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
};

export default page;
