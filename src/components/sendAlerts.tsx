'use client'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import React from "react";
import { toast } from "sonner";

const SendAlerts = () => {
  const sendEmail = async () => {
    try {
      const res = await fetch("/api/send", { method: "POST" });
      const data = await res.json();
      console.log(data);
      if(res.ok){
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <>
    <SidebarInset className="border w-full">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Send Email</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex items-center justify-center gap-x-3 my-5">
        <Button onClick={sendEmail}>Send Jobs Notification</Button>
        <Button variant={"secondary"}>Send Jobs Notification</Button>
      </div>
    </SidebarInset>
    </>
  );
};

export default SendAlerts;
