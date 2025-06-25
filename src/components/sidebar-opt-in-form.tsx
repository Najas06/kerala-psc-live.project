import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { SidebarInput } from "@/components/ui/sidebar";
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import SignOut from "./sign-out";
import Image from "next/image";

export async function SidebarOptInForm() {
  const session = await auth();
  const user = session?.user;
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;

  if (!isAdmin) return redirect("/");
  // console.log(user);

  return (
    <Card className="shadow-none">
      <form>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-sm flex items-center justify-between">
            <p>{`Hi ${user?.name} 👌`}</p>
            <Image
              width={40}
              height={40}
              src={user?.image || "/default-avatar.png"}
              alt="admin icon"
              className="rounded-full w-10 h-10 object-cover"
              loading="lazy"
            />
          </CardTitle>
          <CardDescription>{user?.email}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2.5 p-4">
          {/* <SidebarInput type="email" placeholder="Email" /> */}
          <SignOut />
        </CardContent>
      </form>
    </Card>
  );
}
