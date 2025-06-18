import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import dbConnect from "@/lib/db";
import ArticleModel from "@/lib/models/article";
import { Article } from "@/types/type";

export const metadata = {
  title: "Kerala PSC Live - Articles",
  description:
    "Get the latest Kerala PSC Jobs alerts, live notifications, and exam updates in one place. Stay ahead with PSC Job posts and applications links.",
  keywords: [
    "Kerala PSC live",
    "Kerala PSC notifications",
    "Kerala PSC recruitment",
    "Kerala PSC jobs 2025",
    "Kerala PSC syllabus",
    "Kerala PSC result",
    "Kerala government jobs",
    "PSC exam details",
    "10th pass Kerala jobs",
    "12th pass PSC jobs",
    "Degree level PSC posts",
    "Post graduation PSC recruitment",
    "PSC job updates Kerala",
    "Kerala Public Service Commission",
    "Kerala PSC June Exam 2025",
  ],
};

export default async function Page() {
  await dbConnect();
  const articles = (await ArticleModel.find()
    .sort({ createdAt: -1 })
    .lean()) as Article[];

  const firstArticle = articles[0];

  const publishedDate = firstArticle?.createdAt
    ? new Date(firstArticle.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="bg-slate-50">
      <section className="my-10">
        <MaxWidthWrapper>
          <div className="tracking-tight">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Articles & Insights
            </h2>

            {firstArticle ? (
              <div className="my-5 bg-slate-100 shadow-md rounded-lg flex flex-col md:flex-row h-auto md:max-h-[300px] gap-3 p-3 overflow-hidden">
                <div className="w-full md:w-1/2 h-56 md:h-auto overflow-hidden rounded-md md:rounded-l-lg md:rounded-r-none">
                  <Image
                    src={firstArticle.imageUrl}
                    alt={firstArticle.title || "Article Image"}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="flex-1 flex flex-col gap-y-2 p-0 md:p-3">
                  <h3 className="text-xl md:text-2xl font-medium leading-tight line-clamp-2">
                    {firstArticle.title}
                  </h3>
                  <p className="text-green-600 text-sm leading-snug line-clamp-3">
                    {firstArticle.metaDescription}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Published: </strong>
                    {publishedDate}
                  </p>
                  <Link
                    href={`/articles/${firstArticle._id}`}
                    className="mt-auto bg-green-600 text-white py-2 px-4 rounded-md self-start flex items-center gap-2 hover:bg-green-700 transition-colors text-sm"
                  >
                    Read More <MoveRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <Skeleton className="w-full h-[300px] rounded-lg" />
            )}

            <p className="text-xl font-semibold mt-10">Recent Articles</p>

            {articles.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {articles.slice(1).map((article) => (
                  <div
                    key={article._id}
                    className="bg-white rounded-lg shadow-md p-4"
                  >
                    {article.imageUrl && (
                      <Image
                        src={article.imageUrl}
                        alt={article.title || "Article Thumbnail"}
                        width={300}
                        height={200}
                        className="w-full h-36 object-cover mb-3 rounded-md"
                      />
                    )}
                    <h4 className="text-lg font-semibold line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                      {article.metaDescription}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Published:{" "}
                      {new Date(article.createdAt || "").toLocaleDateString(
                        "en-IN"
                      )}
                    </p>
                    <Link
                      href={`/articles/${article._id}`}
                      className="mt-4 inline-block text-green-600 hover:underline text-sm"
                    >
                      Read More
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
