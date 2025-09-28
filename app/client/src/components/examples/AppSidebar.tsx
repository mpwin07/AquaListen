import { AppSidebar } from '../AppSidebar';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Router } from "wouter";

export default function AppSidebarExample() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <Router>
      <SidebarProvider style={style as React.CSSProperties}>
        <div className="flex h-screen w-full">
          <AppSidebar modelStatus="loaded" />
          <div className="flex-1 p-4">
            <p className="text-muted-foreground">Sidebar is displayed on the left</p>
          </div>
        </div>
      </SidebarProvider>
    </Router>
  );
}