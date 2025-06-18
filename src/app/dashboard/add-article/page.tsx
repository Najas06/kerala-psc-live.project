import AddArticleForm from "@/components/AddArticleForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  if (user?.email !== process.env.ADMIN_EMAIL) {
    redirect("/");
  }
  return <AddArticleForm />;
}
