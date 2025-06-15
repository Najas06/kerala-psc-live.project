import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { SidebarInput } from "@/components/ui/sidebar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
// import { redirect } from "next/navigation";

export async function SidebarOptInForm() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // console.log(user);

  return (
    <Card className="shadow-none">
      <form>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-sm flex items-center justify-between">
            <p>{`Hi ${user?.given_name} 👌`}</p>
            <img
              src={user?.picture ? user.picture : ""}
              alt="admin icon"
              className="rounded-full w-10 h-10 object-cover"
            />
          </CardTitle>
          <CardDescription>{user?.email}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2.5 p-4">
          {/* <SidebarInput type="email" placeholder="Email" /> */}
          <Link
            href={"/api/auth/login"}
            className={buttonVariants({
              size: "sm",
              className: "w-full",
            })}
          >
            Log out 👋
          </Link>
        </CardContent>
      </form>
    </Card>
  );
}
