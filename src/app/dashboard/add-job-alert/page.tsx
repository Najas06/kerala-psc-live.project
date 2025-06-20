import AddJobForm from "@/components/AddJobForm";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
export default async function page() {
  const session = await auth();
    const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;
  // console.log(isAdmin);

  if (!isAdmin) return redirect("/");
  return <AddJobForm />;
}
