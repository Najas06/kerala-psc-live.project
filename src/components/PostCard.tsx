// components/PostCard.tsx
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Job } from "@/types/type"; // Import the Job type
import Image from "next/image";

const PostCard = ({ job }: { job: Job }) => {
  // Accept a 'job' prop of type Job
  const { postName, jobDescription, imageUrl, lastDate, _id } = job; // Destructure directly from 'job'
  const safeTitle = postName ?? "";

  return (
    <Card className="w-[300px] h-[380px]  rounded-xl shadow-md flex flex-col justify-between">
      <div className="flex justify-center ">
        <Image
          src={imageUrl || "/bgBanner.jpg"}
          alt={postName}
          width={300}
          height={200}
          className="object-cover w-full h-[200px] rounded-t-xl"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>
      <CardContent className=" px-3 pb-6">
        <h2 className="text-base font-semibold ">
          {safeTitle.length > 25 ? safeTitle.slice(0, 30).concat("...") : safeTitle}
        </h2>
        <p className="text-sm tracking-tighter text-gray-600">
          {jobDescription?.slice(0, 65).concat("...")}
        </p>
        <p className="text-sm mt-2 text-red-600">
          <strong>Last Date:</strong> {lastDate}
        </p>
        <Link href={`/jobs/${_id}`}>
          <Button
            className="mt-6 bg-slate-200 text-green-600 w-full text-sm font-medium hover:text-white"
            // You'll likely want to wrap this Button in a Link component for navigation
            // For example: <Link href={`/jobs/${_id}`}><Button>View Details</Button></Link>
          >
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PostCard;
