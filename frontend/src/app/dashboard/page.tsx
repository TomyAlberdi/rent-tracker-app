import MobileFallback from "@/app/Pages/Error/MobileFallback";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Outlet } from "react-router-dom";

export default function Page() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileFallback />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header>
        <div className="page-full-h overflow-x-hidden px-4 custom-sidebar">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
