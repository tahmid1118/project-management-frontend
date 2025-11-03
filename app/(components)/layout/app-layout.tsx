"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Don't show layout on login page
  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#432c52] via-[#2a3b36] to-[#432c52]">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header isSidebarCollapsed={isSidebarCollapsed} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
