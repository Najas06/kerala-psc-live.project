// components/PostCard.tsx
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Job } from "@/types/type"; // Import the Job type

const PostCard = ({ job }: { job: Job }) => { // Accept a 'job' prop of type Job
  const { postName, jobDescription, imageUrl, lastDate, _id } = job; // Destructure directly from 'job'

  return (
    <Card className="w-[290px] h-[400px] rounded-xl shadow-md flex flex-col justify-between">
      <div className="flex justify-center ">
        <img
          src={imageUrl ? imageUrl : "/bgBanner.jpg"} // Use imageUrl from the job data
          alt={postName} // Good practice to use meaningful alt text
          className="w-full h-[200px] object-cover rounded-t-xl"
        />
      </div>
      <CardContent className=" px-3 pb-6 ">
        <h2 className="text-lg font-semibold ">
          {postName.slice(0, 25).concat("...")}
        </h2>
        <p className="text-sm tracking-tighter text-gray-600">
          {jobDescription.slice(0, 65).concat("...")}
        </p>
        <p className="text-sm mt-2 text-red-600">
          <strong>Last Date:</strong> {lastDate}
        </p>
        <Button
          className="mt-6 bg-slate-200 text-green-600 w-full text-sm font-medium hover:text-white"
          // You'll likely want to wrap this Button in a Link component for navigation
          // For example: <Link href={`/jobs/${_id}`}><Button>View Details</Button></Link>
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default PostCard;