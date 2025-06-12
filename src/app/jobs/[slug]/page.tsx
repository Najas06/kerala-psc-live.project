import { capatilize } from "@/lib/utils";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  return{
    title: `Kerala PSC Live - ${slug ? capatilize(slug) : "All"} Jobs`,
    description: `Get the latest Kerala PSC Jobs alerts, live notifications, and exam updates in one place. stay a head with PSC Job posts and applications links.`,
  }
}

export default function Page() {
  return <div>page</div>;
}
