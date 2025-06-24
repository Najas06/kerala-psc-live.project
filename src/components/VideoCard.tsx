import { cn } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const VideoCard = ({
  className,
  embedUrl,
  title,
  description,
  titleClassName,
  desClassName,
}: {
  className?: string;
  embedUrl?: string;
  title?: string;
  description?: string;
  titleClassName?: string;
  desClassName?: string;
}) => {
  const safeTitle = title ?? "";
  const safeDescription = description ?? "";
  return (
    <Card className={cn("w-[290px] h-[300px] bg-[#F7FEFC]", className)}>
      <iframe
        src={`https://www.youtube.com/embed/${embedUrl}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title="YouTube video player"
        className="w-full rounded-t-lg h-1/2 "
      />
      <CardContent className="px-3 flex flex-col justify-between items-center py-3 tracking-tight h-1/2">
        <h2 className={cn("font-sans font-semibold", titleClassName)}>
          {safeTitle.length > 50 ? `${safeTitle.slice(0, 45)}...` : safeTitle}
        </h2>
        <p className={cn("font-sans text-sm", desClassName)}>
          {safeDescription.length > 100 ? `${safeDescription.slice(0, 100)}...` : safeDescription}
        </p>
        <Link
          className={buttonVariants({ size: "sm" })}
          href={`https://www.youtube.com/watch?v=${embedUrl}`}
          target="_blank"
        >
          Watch Now
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;

{
  /* <iframe width="560" height="315" src="https://www.youtube.com/embed/y2C9-kFFG1M?si=7067U1hgxOtYS51-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */
}
