"use client";

import { useState } from "react";
import {
  FiCalendar,
  FiFilter,
  FiFlag,
  FiPlus,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { dummyMembers, initialBoardData, priorities } from "../data/data";

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const allTasks = Object.values(initialBoardData.tasks);

  const getTaskStatus = (taskId: string) => {
    return (
      Object.keys(initialBoardData.columns).find((colId) =>
        initialBoardData.columns[colId].taskIds.includes(taskId)
      ) || "Unknown"
    );
  };

  const filteredTasks = allTasks.filter((task) => {
    const matchesSearch = task.content
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPriority =
      selectedPriority === "All" || task.priority === selectedPriority;
    const taskStatus = getTaskStatus(task.id);
    const matchesStatus =
      selectedStatus === "All" || taskStatus === selectedStatus;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    const priorityConfig = priorities.find((p) => p.label === priority);
    return priorityConfig?.color || "text-gray-400";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "In Review":
        return "bg-yellow-100 text-yellow-800";
      case "Not Started":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-end">
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <FiPlus className="h-4 w-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-700 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 rounded-lg border border-gray-600 bg-gray-700/50 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FiFilter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="rounded-lg border border-gray-600 bg-gray-700/50 py-2 px-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All Priorities</option>
                {priorities.map((priority) => (
                  <option key={priority.label} value={priority.label}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-lg border border-gray-600 bg-gray-700/50 py-2 px-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              {Object.keys(initialBoardData.columns).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-700">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">
            All Tasks ({filteredTasks.length})
          </h2>
        </div>

        <div className="divide-y divide-gray-700">
          {filteredTasks.map((task) => {
            const taskStatus = getTaskStatus(task.id);
            const assignedMember = dummyMembers.find(
              (m) => m.user_id === task.assignees?.[0]
            );

            return (
              <div
                key={task.id}
                className="p-6 hover:bg-gray-700/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-white">
                        {task.content}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(taskStatus)}`}
                      >
                        {taskStatus}
                      </span>
                    </div>

                    {task.description && (
                      <p className="text-sm text-gray-600 mb-3">
                        {task.description}
                      </p>
                    )}

                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      {task.priority && (
                        <div className="flex items-center space-x-1">
                          <FiFlag
                            className={`h-4 w-4 ${getPriorityColor(task.priority)}`}
                          />
                          <span className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </span>
                        </div>
                      )}

                      {assignedMember && (
                        <div className="flex items-center space-x-1">
                          <FiUser className="h-4 w-4" />
                          <span>{assignedMember.full_name}</span>
                        </div>
                      )}

                      {task.endDate && (
                        <div className="flex items-center space-x-1">
                          <FiCalendar className="h-4 w-4" />
                          <span>Due: {task.endDate}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredTasks.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <FiSearch className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tasks found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
