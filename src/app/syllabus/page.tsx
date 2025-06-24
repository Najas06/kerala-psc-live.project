import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import VideoCard from "@/components/VideoCard";

export default function page() {
  return (
    <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper>
          <div className="tracking-tight my-8">
            <h2 className="text-3xl font-semibold">
              Syllabus & Video Tutorials
            </h2>
            <p className="font-light text-sm text-green-600">
              Boost your Kerala PSC exam preparation with our handpicked video
              library. We&apos;ve collaborated with top YouTube educators to bring
              you expert&apos;led tutorials, detailed subject breakdowns, and proven
              study strategies — all crafted to guide you towards success in
              your PSC journey 🔥🏆.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold flex items-center tracking-tighter gap-x-2 py-4 border-b mb-5">
              Featured Videos
            </h2>

            <div className="flex justify-center">
              <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {featuredVideos.slice(0,3).map((video, index) => (
                  <VideoCard
                    className="w-full h-[350px]"
                    key={index}
                    description={video.des}
                    title={video.title}
                    embedUrl={video.embedUrl}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-600 my-6 border-b pb-6">
              Disclaimer: The video content featured on this page is publicly
              available on YouTube and is owned by the respective content
              creators. We have received explicit permission from the nearby PSC
              coaching center to embed their videos here to help candidates
              access useful learning materials. Kerala PSC Live does not claim
              ownership of these videos and is not responsible for their
              accuracy or updates. For any content-related concerns, please
              contact the original video owner directly via YouTube.
            </p>
          </div>
        </MaxWidthWrapper>
      </section>
      <section>
        <MaxWidthWrapper>
          <div>
            <h2 className="text-3xl font-semibold flex items-center tracking-tighter gap-x-2 py-4 border-b mb-5">
              Video Tutorials
            </h2>
            <div className="flex justify-center">
              <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {featuredVideos.map((video, index) => (
                  <VideoCard
                  className="w-full"
                  titleClassName="text-base"
                  desClassName="text-xs"
                    key={index}
                    description={video.des}
                    title={video.title}
                    embedUrl={video.embedUrl}
                  />
                ))}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}

const featuredVideos = [
  {
    id: 1,
    title: "Average Previous PSC questions and answers PART 1",
    embedUrl: "YL8hf03sF0s",
    des: "Frequently repeating questions and answers explaining with a simple way.",
  },
  {
    id: 2,
    title: "PSC Repeatly Mixed Fractions questions and answers.",
    embedUrl: "1mKb8G3femw",
    des: "Learn the concept of mixed fractions with the help of PSC Repeatly Mixed Fractions questions and answers.",
  },
  {
    id: 3,
    title: "Simplification -ൽ നിങ്ങൾ ആവശ്യപ്പെട്ട ചോദ്യങ്ങൾ part 1.",
    embedUrl: "8yJZAr2Kn5U",
    des: "Easy way understand Simplification questions and answers.",
  },
  {
    id: 4,
    title: "HOW TO FIND ANY CUBE ROOTS IN 3 SECONDS.",
    embedUrl: "2dO_T89p4Ag",
    des: "How to find any cube roots in 3 seconds with this video.",
  }
];
