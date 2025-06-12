import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";

const PostCard = ({
  title,
  description,
  image,
  lastDate,
}: {
  title: string;
  description: string;
  image?: string;
  lastDate: string;
}) => {
  return (
    <Card className="w-[290px] h-[400px] rounded-xl shadow-md flex flex-col justify-between">
      <div className="flex justify-center ">
        <img
          src="/bgBanner.jpg" // replace with your actual image path
          alt="Hand Icon"
          className="w-full h-[200px] object-cover rounded-t-xl"
        />
      </div>
      <CardContent className=" px-3 pb-6 ">
        <h2 className="text-lg font-semibold ">{title.slice(0,25).concat("...")}</h2>
        <p className="text-sm tracking-tighter text-gray-600">{description.slice(0,65).concat("...")}</p>
        <p className="text-sm mt-2 text-red-600">
          <strong>Last Date:</strong> {lastDate}
        </p>
        <Button
          className="mt-6 bg-slate-200 text-green-600 w-full text-sm font-medium hover:text-white"
          //   onClick={onClick}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default PostCard;
