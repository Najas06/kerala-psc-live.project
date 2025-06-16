"use client";

// import { MoreHorizontal, type LucideIcon } from "lucide-react";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  // SidebarMenuItem,
  // useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    href: string;
    icon?: JSX.Element;
  }[];
}) {
  // const { isMobile } = useSidebar();

  return (
    <SidebarGroup >
      <SidebarMenu>
        {items.map((item, index) => (
          <SidebarMenuButton key={index} className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <Link
              href={item.href}
              className={buttonVariants({ variant: "ghost" })}
            >
              {item.icon}
              {item.title}
            </Link>
          </SidebarMenuButton>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
