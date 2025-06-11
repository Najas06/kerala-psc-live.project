import { GetDailyAlertBtn } from "@/components/GetDailyAlertBtn";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-slate-50">
      {/* // banner section */}
      <section className="relative">
        <MaxWidthWrapper className="relative pt-20">
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
              <p className="text-center mt-2 font-light px-2 md:text-xl lg:text-2xl">
                Your one-stop destination for all Kerala Public Service
                Commision job alerts
              </p>
              <div className="flex justify-center mt-5">
                {/* <Button
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Get Daily Alerts <MoveRight />
                </Button> */}
                <GetDailyAlertBtn/>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section>
        <MaxWidthWrapper>
          <div className="py-5 md:py-10">
            <h1 className="text-sm md:text-xl tracking-tighter  px-2">
              New Jobs Alert{" "}
              <span className="text-green-600 underline font-semibold">{`${new Date().toDateString()}`}</span>
            </h1>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
