"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiBarChart,
  FiCalendar,
  FiGrid,
  FiHome,
  FiSettings,
  FiUsers,
} from "react-icons/fi";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: FiHome },
  { name: "Kanban Board", href: "/kanban", icon: FiGrid },
  { name: "Tasks", href: "/tasks", icon: FiBarChart },
  { name: "Team", href: "/team", icon: FiUsers },
  { name: "Calendar", href: "/calendar", icon: FiCalendar },
  { name: "Settings", href: "/settings", icon: FiSettings },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={`flex h-screen flex-col bg-gray-900 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b border-gray-700 px-4">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-white">ProjectFlow</h1>
        )}
        <button
          onClick={onToggle}
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          {isCollapsed ? (
            <span className="text-lg">→</span>
          ) : (
            <span className="text-lg">←</span>
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon
                className={`h-5 w-5 flex-shrink-0 ${
                  isCollapsed ? "mx-auto" : "mr-3"
                } ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                }`}
              />
              {!isCollapsed && item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
