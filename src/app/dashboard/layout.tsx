import { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider className="max-w-screen-2xl mx-auto">
      <div className="flex min-h-screen w-screen">
        <AppSidebar />
        {children}
      </div>
    </SidebarProvider>
  );
}
