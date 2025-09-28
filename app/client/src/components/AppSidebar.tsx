import { useState } from "react";
import { Link, useLocation } from "wouter";
import Logo from "@/assets/logo.png"; // Vite alias '@' points to src/ 
import { 
  Activity, 
  Upload, 
  FolderOpen, 
  MapPin, 
  Bell, 
  Info, 
  Settings,
  Menu,
  Waves
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Activity },
  { title: "Upload", url: "/upload", icon: Upload },
  { title: "Batch Processing", url: "/batch", icon: FolderOpen },
  { title: "Sites", url: "/sites", icon: MapPin },
  { title: "Alerts", url: "/alerts", icon: Bell },
  { title: "Model Info", url: "/model-info", icon: Info },
  { title: "Settings", url: "/settings", icon: Settings },
];

interface AppSidebarProps {
  modelStatus?: 'loaded' | 'loading' | 'error';
}

export function AppSidebar({ modelStatus = 'loaded' }: AppSidebarProps) {
  const [location] = useLocation();

  const getStatusColor = () => {
    switch (modelStatus) {
      case 'loaded': return 'bg-green-500';
      case 'loading': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (modelStatus) {
      case 'loaded': return 'Model Ready';
      case 'loading': return 'Loading...';
      case 'error': return 'Model Error';
      default: return 'Unknown';
    }
  };

  return (
    <Sidebar data-testid="sidebar-main">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
  <img src={Logo} alt="AquaListen Logo" className="w-full h-full object-cover" />
</div>

          <div>
            <h1 className="font-semibold text-foreground">AquaListen</h1>
            <div className="flex items-center space-x-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
              <span className="text-xs text-muted-foreground">{getStatusText()}</span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url} data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}