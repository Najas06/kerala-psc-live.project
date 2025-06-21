import React from "react";
import { Button, buttonVariants } from "./ui/button";

type ArticleCardProps = {
  title: string;
  imageUrl : string
  metaDescription: string;
}
const ArticleCard = ({title,imageUrl,metaDescription}:ArticleCardProps ) => {

  return (
    <div className=" border rounded shadow-lg p-3 md:p-0 flex flex-col md:grid  md:grid-cols-3 my-5">
      <div className="col-span-2">
        <div className="p-3 flex-col h-full justify-evenly flex space-y-3">
          <h1 className="text-lg md:text-xl tracking-tight font-semibold">
            {title}
          </h1>
          <p className="text-xs md:text-base text-black/80">
            {metaDescription}
          </p>

          <Button
            className={`${buttonVariants({
              size: "lg",
              variant: "ghost",
            })} max-w-[100px]`}
          >
            Read More
          </Button>
        </div>
      </div>
      <div className="col-span-1">
        <img
          src={imageUrl ? imageUrl : "/bgBanner.jpg"}
          alt=""
          className="w-full h-[200px] md:h-[300px] rounded-md object-cover md:rounded-l-md md:rounded-r-none"
        />
      </div>
    </div>
  );
};

export default ArticleCard;
