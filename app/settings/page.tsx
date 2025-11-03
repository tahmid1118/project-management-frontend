"use client";

import { useState } from "react";
import { FiBell, FiLock, FiMoon, FiSave, FiSun, FiUser } from "react-icons/fi";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Profile settings
    fullName: "John Doe",
    email: "john.doe@example.com",
    jobTitle: "Project Manager",

    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    weeklyReports: false,

    // Appearance settings
    theme: "light",
    language: "en",
    timezone: "UTC-5",

    // Privacy settings
    profileVisibility: "team",
    activityTracking: true,
  });

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving settings:", settings);
    // Show success message
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-end">
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiSave className="h-4 w-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-700 p-4">
            <nav className="space-y-1">
              <a
                href="#profile"
                className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg"
              >
                <FiUser className="h-4 w-4" />
                <span>Profile</span>
              </a>
              <a
                href="#notifications"
                className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700/30 rounded-lg"
              >
                <FiBell className="h-4 w-4" />
                <span>Notifications</span>
              </a>
              <a
                href="#appearance"
                className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700/30 rounded-lg"
              >
                <FiSun className="h-4 w-4" />
                <span>Appearance</span>
              </a>
              <a
                href="#privacy"
                className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700/30 rounded-lg"
              >
                <FiLock className="h-4 w-4" />
                <span>Privacy</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div
            id="profile"
            className="bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-700 p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-4">
              Profile Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={settings.fullName}
                  onChange={(e) =>
                    handleSettingChange("fullName", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleSettingChange("email", e.target.value)}
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={settings.jobTitle}
                  onChange={(e) =>
                    handleSettingChange("jobTitle", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div
            id="notifications"
            className="bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-700 p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-4">
              Notification Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-gray-500">
                    Receive notifications via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      handleSettingChange(
                        "emailNotifications",
                        e.target.checked
                      )
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Push Notifications
                  </h3>
                  <p className="text-sm text-gray-500">
                    Receive push notifications in browser
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.pushNotifications}
                    onChange={(e) =>
                      handleSettingChange("pushNotifications", e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Task Reminders
                  </h3>
                  <p className="text-sm text-gray-500">
                    Get reminded about upcoming deadlines
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.taskReminders}
                    onChange={(e) =>
                      handleSettingChange("taskReminders", e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div
            id="appearance"
            className="bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-700 p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-4">
              Appearance
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleSettingChange("theme", "light")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                      settings.theme === "light"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <FiSun className="h-4 w-4" />
                    <span>Light</span>
                  </button>
                  <button
                    onClick={() => handleSettingChange("theme", "dark")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                      settings.theme === "dark"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <FiMoon className="h-4 w-4" />
                    <span>Dark</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) =>
                    handleSettingChange("language", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timezone
                </label>
                <select
                  value={settings.timezone}
                  onChange={(e) =>
                    handleSettingChange("timezone", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="UTC-8">Pacific Time (UTC-8)</option>
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                  <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
                  <option value="UTC+1">Central European Time (UTC+1)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div
            id="privacy"
            className="bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-700 p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-4">
              Privacy & Security
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Visibility
                </label>
                <select
                  value={settings.profileVisibility}
                  onChange={(e) =>
                    handleSettingChange("profileVisibility", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-600 bg-gray-700/50 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="public">Public</option>
                  <option value="team">Team Only</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Activity Tracking
                  </h3>
                  <p className="text-sm text-gray-500">
                    Allow tracking of your activity for analytics
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.activityTracking}
                    onChange={(e) =>
                      handleSettingChange("activityTracking", e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
