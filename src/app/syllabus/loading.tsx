import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";

export default function Loading() {
  return (
    <section>
      <MaxWidthWrapper>
        <div className="h-[80vh] bg-slate-50 flex  justify-center p-4">
          <div className="text-center">
            {/* Logo placeholder - replace with your actual logo */}
            <div className="mb-8">
              <div className=" flex justify-center">
                <Image
                  width={100}
                  height={40}
                  src="/logo.png"
                  alt="Kerala PSC Live Logo"
                  className="w-16 h-16 md:w-24 md:h-24 object-contain"
                />
              </div>

              <p className="text-gray-600 text-sm">
                Loading your Syllabus...
              </p>
            </div>

            {/* Animated loading indicator */}
            <div className="relative mb-8">
              <div className="flex justify-center space-x-2">
                <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce"></div>
                <div
                  className="w-3 h-3 bg-green-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-green-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>

            {/* Progress bar */}

            
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
