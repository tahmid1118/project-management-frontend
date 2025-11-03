"use client";

import { useEffect, useState } from "react";
import {
  FiActivity,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { initialBoardData, priorities } from "../data/data";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    teamMembers: 10,
  });

  useEffect(() => {
    const tasks = Object.values(initialBoardData.tasks);
    const completedTasks = initialBoardData.columns["Done"].taskIds.length;
    const inProgressTasks =
      initialBoardData.columns["In Progress"].taskIds.length;

    setStats({
      totalTasks: tasks.length,
      completedTasks,
      inProgressTasks,
      teamMembers: 10,
    });
  }, []);

  const statCards = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: FiActivity,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: FiCheckCircle,
      color: "bg-green-500",
      change: "+8%",
    },
    {
      title: "In Progress",
      value: stats.inProgressTasks,
      icon: FiClock,
      color: "bg-yellow-500",
      change: "+3%",
    },
    {
      title: "Team Members",
      value: stats.teamMembers,
      icon: FiUsers,
      color: "bg-purple-500",
      change: "+2",
    },
  ];

  const recentTasks = Object.values(initialBoardData.tasks).slice(0, 5);
  const upcomingDeadlines = Object.values(initialBoardData.tasks)
    .filter((task) => task.endDate)
    .slice(0, 4);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-2 text-sm text-gray-300">
          <FiCalendar className="h-4 w-4" />
          <span>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`${stat.color} rounded-lg p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <FiTrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Recent Tasks
          </h2>
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      priorities.find((p) => p.label === task.priority)
                        ?.color === "text-red-400"
                        ? "bg-red-400"
                        : priorities.find((p) => p.label === task.priority)
                              ?.color === "text-yellow-300"
                          ? "bg-yellow-400"
                          : priorities.find((p) => p.label === task.priority)
                                ?.color === "text-blue-300"
                            ? "bg-blue-400"
                            : "bg-gray-400"
                    }`}
                  ></div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {task.content}
                    </p>
                    <p className="text-xs text-gray-400">
                      {task.priority} Priority
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  {Object.keys(initialBoardData.columns).find((colId) =>
                    initialBoardData.columns[colId].taskIds.includes(task.id)
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Upcoming Deadlines
          </h2>
          <div className="space-y-3">
            {upcomingDeadlines.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {task.content}
                  </p>
                  <p className="text-xs text-gray-400">Due: {task.endDate}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      task.priority === "Urgent"
                        ? "bg-red-100 text-red-800"
                        : task.priority === "High"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
