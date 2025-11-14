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

  // Don't show layout on login/signup pages
  if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:bg-gradient-to-r dark:from-[#432c52] dark:via-[#2a3b36] dark:to-[#432c52]">
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
