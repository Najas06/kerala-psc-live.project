import { redirect } from "next/navigation";
import React from "react";
import { auth } from "../../../../auth";
import SendAlerts from "@/components/sendAlerts";

export default async function page() {
  const session = await auth();
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;
  // console.log(isAdmin);

  if (!isAdmin) return redirect("/");
  return <SendAlerts/>;
}
