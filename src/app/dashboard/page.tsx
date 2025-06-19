export const dynamic = "force-dynamic";

// import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  // SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { File, Newspaper, Users } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Kerala PSC Live - Admin Dashboard",
    description:
      "Get the latest Kerala PSC Jobs alerts, live notifications, and exam updates in one place. stay a head with PSC Job posts and applications links.",
  };
}

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user: KindeUser | null = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;
  // console.log(isAdmin);

  console.log("User email:", user?.email || "User not logged in");
  console.log("Admin email from env:", process.env.ADMIN_EMAIL);

  if (!isAdmin) return redirect("/");

  if (user?.email !== process.env.ADMIN_EMAIL) {
    redirect("/");
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // JOBS Data Fetching
  const job = await fetch(`${baseUrl}/api/jobs`, {
    cache: "no-cache",
  });
  const jobsData = await job.json();

  // console.log(jobsData);

  // SUBSCRIBERS Data Fetching
  const subscriber = await fetch(`${baseUrl}/api/subscribe`, {
    cache: "no-cache",
  });
  const subscribersData = await subscriber.json();
  return (
    <SidebarInset className="border w-full">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* number of users subscribed */}
          <div className=" rounded-xl ">
            <Card className="w-full h-full border p-3 flex flex-col justify-between">
              <h3 className="text-[8px] lg:text-lg gap-x-2 tracking-tighter flex items-center">
                <Users className="w-2 h-2 md:w-4 md:h-4 lg:w-6 lg:h-6" /> No. of{" "}
                <span className="text-green-600 font-medium underline">
                  Email Subscribers
                </span>
              </h3>
              <p className="my-5 text-3xl md:text-5xl font-semibold text-center">
                {subscribersData.count > 0 ? subscribersData.count : 0}{" "}
                <span className="">Users</span>
              </p>

              <div>
                <p className="text-[8px] md:text-sm text-gray-600">
                  Last User Subscribed Date : {new Date().toDateString()}
                </p>
              </div>
            </Card>
          </div>

          {/* number of posts published */}
          <div className=" rounded-xl ">
            <Card className="w-full h-full border p-3 flex flex-col justify-between">
              <h3 className="text-[8px] lg:text-lg gap-x-2 tracking-tighter flex items-center">
                <File className="w-2 h-2 md:w-4 md:h-4 lg:w-6 lg:h-6" /> No. of{" "}
                <span className="text-green-600 font-medium underline">
                  Posts Published
                </span>
              </h3>
              <p className="my-5 text-3xl md:text-5xl font-semibold text-center">
                {jobsData.count > 0 ? jobsData.count : 0}{" "}
                <span className="">Posts</span>
              </p>

              <div>
                <p className="text-[8px] md:text-sm text-gray-600">
                  Last Posts Fetch Date : {new Date().toDateString()}
                </p>
              </div>
            </Card>
          </div>

          {/* number of article published */}
          <div className=" rounded-xl ">
            <Card className="w-full h-full border p-3 flex flex-col justify-between">
              <h3 className="text-[8px] lg:text-lg gap-x-2 tracking-tighter flex items-center">
                <Newspaper className="w-2 h-2 md:w-4 md:h-4 lg:w-6 lg:h-6" />{" "}
                No. of{" "}
                <span className="text-green-600 font-medium underline">
                  Articles Published
                </span>
              </h3>
              <p className="my-5 text-3xl md:text-5xl font-semibold text-center">
                10 <span className="">Articles</span>
              </p>

              <div>
                <p className="text-[8px] md:text-sm text-gray-600">
                  Last Articles Fetch Date : {new Date().toDateString()}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
