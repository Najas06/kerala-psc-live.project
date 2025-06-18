import AddJobForm from "@/components/AddJobForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;
  // console.log(isAdmin);

  if (!isAdmin) return redirect("/");
  return <AddJobForm />;
}
