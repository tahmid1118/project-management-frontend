"use client";

import { usePathname } from "next/navigation";
import { FiBell, FiUser } from "react-icons/fi";

interface HeaderProps {
  isSidebarCollapsed: boolean;
}

export default function Header({}: HeaderProps) {
  const pathname = usePathname();

  // Get page title based on current route
  const getPageTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/kanban":
        return "Kanban Board";
      case "/tasks":
        return "Tasks";
      case "/team":
        return "Team";
      case "/calendar":
        return "Calendar";
      case "/settings":
        return "Settings";
      default:
        return "ProjectFlow";
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">{/* Empty space for left side */}</div>

        {/* Centered Page Title */}
        <div className="flex-1 flex justify-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {getPageTitle()}
          </h1>
        </div>

        {/* Right side actions */}
        <div className="flex-1 flex items-center justify-end space-x-4">
          {/* Notifications */}
          <button className="relative rounded-full p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors">
            <FiBell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                John Doe
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Project Manager
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <FiUser className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
