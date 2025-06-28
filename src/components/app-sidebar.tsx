import * as React from "react";
import { BriefcaseBusiness, GalleryVerticalEnd, Library, Mail, Newspaper } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { SidebarOptInForm } from "@/components/sidebar-opt-in-form";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  // SidebarHeader,
  // SidebarMenu,
  // SidebarMenuButton,
  // SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const NavLinks = [
  {
    title:"DashHome",
    href:"/dashboard",
    icon: <GalleryVerticalEnd />,

  },
  {
    title:"Add New Job Alert",
    href:"/dashboard/add-job-alert",
    icon: <BriefcaseBusiness />,

  },
  {
    title:"Add New Article",
    href:"/dashboard/add-article",
    icon: <Newspaper />,
  },
  {
    title:"Add New Syllabus",
    href:"/dashboard/add-syllabus",
    icon: <Library />,
  },
  {
    title:"Send Email Notification",
    href:"/dashboard/send-email-notification",
    icon: <Mail />,
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent className="relative top-14">
        <NavMain items={NavLinks} />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1">
          <SidebarOptInForm />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
