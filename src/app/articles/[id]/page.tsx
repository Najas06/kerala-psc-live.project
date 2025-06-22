import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Article, SingleArticleResponse } from "@/types/type";
import { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import ArticleShareButtons from "@/components/ArticleShareButtons";
import Image from "next/image";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const res = await fetch(`${baseUrl}/api/articles/${id}`);
  const { data }: SingleArticleResponse = await res.json();
  const article: Article = data;

  return {
    title: `Kerala PSC Live - ${article.title}`,
    description: article.metaDescription,
    keywords: article.metaKeywords,
    openGraph: {
      title: `Kerala PSC Live - ${article.title}`,
      description: article.metaDescription,
      images: [{ url: article.imageUrl }],
      url: `${baseUrl}/articles/${id}`,
      type: "article",
    },
  };
}

export default async function page({ params }: Props) {
  const { id } = params;
  const res = await fetch(`${baseUrl}/api/articles/${id}`, {
    next: { revalidate: 3600 },
  });
  const { data }: SingleArticleResponse = await res.json();
  const article: Article = data;
  //   console.log(article);
  const publishedDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";
  return (
    <div>
      <section className="my-10 tracking-tight">
        <MaxWidthWrapper>
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbLink asChild>
                  <Link href={"/"} className="text-green-600">
                    Home
                  </Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
                <BreadcrumbLink asChild>
                  <Link href={"/articles"} className="text-green-600">
                    Articles
                  </Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
                <BreadcrumbLink asChild>
                  <span className="font-medium text-gray-500">
                    {article.title}
                  </span>
                </BreadcrumbLink>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <h1 className="text-3xl font-semibold my-5">{article.title}</h1>
          <h2 className="text-green-600">
            <strong>Published on : </strong>
            {publishedDate} | <strong>Author : </strong>
            {article.author}
          </h2>
        </MaxWidthWrapper>
      </section>

      <section>
        <MaxWidthWrapper>
          <Image
            width={1280}
            height={720}
            priority
            src={article.imageUrl}
            alt={article.title}
            className="w-full max-h-[500px] h-full object-cover rounded-md"
          />
          <div className="my-10 prose max-w-screen-2xl ">
            <MDXRemote source={article.content} />
          </div>
          <ArticleShareButtons
            articleTitle={article.title}
            articleUrl={`${baseUrl}/articles/${id}`}
          />
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
