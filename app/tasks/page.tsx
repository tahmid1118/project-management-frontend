"use client";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import {
  FiCalendar,
  FiCheck,
  FiFilter,
  FiFlag,
  FiPlus,
  FiSearch,
  FiTrash,
  FiUser,
} from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../(components)/ui/dialog";
import { dummyMembers, initialBoardData, priorities, Task } from "../data/data";

const { RangePicker } = DatePicker;

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [tasks, setTasks] = useState(Object.values(initialBoardData.tasks));
  const [sortBy, setSortBy] = useState<
    "priority" | "status" | "assignee" | "none"
  >("priority");
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(
    new Set()
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    content: "",
    description: "",
    priority: "Medium",
    assignees: [],
    startDate: "",
    endDate: "",
  });

  const getTaskStatus = (taskId: string) => {
    if (completedTasks.has(taskId)) return "Done";
    return (
      Object.keys(initialBoardData.columns).find((colId) =>
        initialBoardData.columns[colId].taskIds.includes(taskId)
      ) || "Unknown"
    );
  };

  const filteredTasks = tasks.filter((task) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 border-green-300 dark:border-green-500/30";
      case "In Progress":
        return "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-500/30";
      case "In Review":
        return "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-500/30";
      case "Not Started":
        return "bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-500/30";
      default:
        return "bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-500/30";
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    setCompletedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    setCompletedTasks((prev) => {
      const newSet = new Set(prev);
      newSet.delete(taskId);
      return newSet;
    });
  };

  const clearCompletedTasks = () => {
    setTasks((prev) => prev.filter((task) => !completedTasks.has(task.id)));
    setCompletedTasks(new Set());
  };

  const addNewTask = () => {
    if (!newTask.content?.trim()) {
      return;
    }

    const taskId = `task-${Date.now()}`;
    const task: Task = {
      id: taskId,
      content: newTask.content,
      description: newTask.description || "",
      priority: newTask.priority || "Medium",
      assignees: newTask.assignees || [],
      startDate: newTask.startDate || "",
      endDate: newTask.endDate || "",
    };

    setTasks((prev) => [...prev, task]);
    setIsDialogOpen(false);
    setNewTask({
      content: "",
      description: "",
      priority: "Medium",
      assignees: [],
      startDate: "",
      endDate: "",
    });
  };

  const toggleGroup = (groupKey: string) => {
    setCollapsedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupKey)) {
        newSet.delete(groupKey);
      } else {
        newSet.add(groupKey);
      }
      return newSet;
    });
  };

  const groupTasks = (tasks: typeof filteredTasks) => {
    if (sortBy === "none") {
      return { "All Tasks": tasks };
    }

    const groups: Record<string, typeof tasks> = {};

    tasks.forEach((task) => {
      let groupKey = "";

      switch (sortBy) {
        case "priority":
          groupKey = task.priority || "No Priority";
          break;
        case "status":
          groupKey = getTaskStatus(task.id);
          break;
        case "assignee":
          const assignedMember = dummyMembers.find(
            (m) => m.user_id === task.assignees?.[0]
          );
          groupKey = assignedMember?.full_name || "Unassigned";
          break;
        default:
          groupKey = "All Tasks";
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(task);
    });

    // Sort groups by priority order if sorting by priority
    if (sortBy === "priority") {
      const priorityOrder = [
        "Urgent",
        "High",
        "Medium",
        "Low",
        "Clear",
        "No Priority",
      ];
      const sortedGroups: Record<string, typeof tasks> = {};
      priorityOrder.forEach((priority) => {
        if (groups[priority]) {
          sortedGroups[priority] = groups[priority];
        }
      });
      return sortedGroups;
    }

    return groups;
  };

  const groupedTasks = groupTasks(filteredTasks);
  const completedCount = completedTasks.size;
  const totalCount = filteredTasks.length;
  const completionPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const getGroupColor = (groupKey: string) => {
    if (sortBy === "priority") {
      switch (groupKey) {
        case "Urgent":
          return "bg-red-500";
        case "High":
          return "bg-orange-500";
        case "Medium":
          return "bg-blue-500";
        case "Low":
          return "bg-gray-500";
        case "Clear":
          return "bg-gray-400";
        default:
          return "bg-gray-500";
      }
    } else if (sortBy === "status") {
      switch (groupKey) {
        case "Done":
          return "bg-green-500";
        case "In Progress":
          return "bg-blue-500";
        case "In Review":
          return "bg-yellow-500";
        case "Not Started":
          return "bg-gray-500";
        default:
          return "bg-gray-500";
      }
    }
    return "bg-purple-500";
  };

  return (
    <div className="p-6 space-y-4">
      {completedCount > 0 && (
        <div className="flex justify-end">
          <button
            onClick={clearCompletedTasks}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiTrash className="h-4 w-4" />
            <span>Clear Completed ({completedCount})</span>
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 py-2 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FiFilter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 py-2 px-3 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 py-2 px-3 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              {Object.keys(initialBoardData.columns).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as "priority" | "status" | "assignee" | "none"
                )
              }
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 py-2 px-3 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="none">No Grouping</option>
              <option value="priority">Group by Priority</option>
              <option value="status">Group by Status</option>
              <option value="assignee">Group by Assignee</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks Checklist with Progress */}
      <div className="bg-white dark:bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Task Checklist ({filteredTasks.length})
              </h2>
              {totalCount > 0 && (
                <button
                  onClick={() => {
                    if (completedCount === totalCount) {
                      setCompletedTasks(new Set());
                    } else {
                      setCompletedTasks(
                        new Set(filteredTasks.map((task) => task.id))
                      );
                    }
                  }}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {completedCount === totalCount ? "Uncheck All" : "Check All"}
                </button>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                {completedCount} of {totalCount} completed (
                {completionPercentage}%)
              </span>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors text-sm">
                    <FiPlus className="h-4 w-4" />
                    <span>New Task</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                      Create New Task
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {/* Task Title */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Task Title *
                      </label>
                      <input
                        type="text"
                        value={newTask.content || ""}
                        onChange={(e) =>
                          setNewTask({ ...newTask, content: e.target.value })
                        }
                        placeholder="Enter task title..."
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 py-2 px-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Description
                      </label>
                      <textarea
                        value={newTask.description || ""}
                        onChange={(e) =>
                          setNewTask({
                            ...newTask,
                            description: e.target.value,
                          })
                        }
                        placeholder="Enter task description..."
                        rows={3}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 py-2 px-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    {/* Priority */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Priority
                      </label>
                      <select
                        value={newTask.priority || "Medium"}
                        onChange={(e) =>
                          setNewTask({ ...newTask, priority: e.target.value })
                        }
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 py-2 px-3 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        {priorities.map((priority) => (
                          <option key={priority.label} value={priority.label}>
                            {priority.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Assignee */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Assign To
                      </label>
                      <select
                        value={newTask.assignees?.[0] || ""}
                        onChange={(e) =>
                          setNewTask({
                            ...newTask,
                            assignees: e.target.value
                              ? [parseInt(e.target.value)]
                              : [],
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 py-2 px-3 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Unassigned</option>
                        {dummyMembers.map((member) => (
                          <option key={member.id} value={member.user_id}>
                            {member.full_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Date Range */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Date Range
                      </label>
                      <RangePicker
                        className="w-full"
                        format="YYYY-MM-DD"
                        value={
                          newTask.startDate && newTask.endDate
                            ? [dayjs(newTask.startDate), dayjs(newTask.endDate)]
                            : null
                        }
                        onChange={(dates) => {
                          if (dates && dates[0] && dates[1]) {
                            setNewTask({
                              ...newTask,
                              startDate: dates[0].format("YYYY-MM-DD"),
                              endDate: dates[1].format("YYYY-MM-DD"),
                            });
                          } else {
                            setNewTask({
                              ...newTask,
                              startDate: "",
                              endDate: "",
                            });
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => {
                        setIsDialogOpen(false);
                        setNewTask({
                          content: "",
                          description: "",
                          priority: "Medium",
                          assignees: [],
                          startDate: "",
                          endDate: "",
                        });
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addNewTask}
                      disabled={!newTask.content?.trim()}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Create Task
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        <div>
          {Object.entries(groupedTasks).map(([groupKey, tasks]) => {
            const isCollapsed = collapsedGroups.has(groupKey);
            const groupCompletedCount = tasks.filter((task) =>
              completedTasks.has(task.id)
            ).length;

            return (
              <div
                key={groupKey}
                className="border-b-4 border-gray-300 dark:border-gray-700 last:border-b-0 mb-2 rounded-lg overflow-hidden shadow-sm"
                style={{
                  borderLeftWidth: "4px",
                  borderLeftColor:
                    sortBy === "priority"
                      ? groupKey === "Urgent"
                        ? "#dc2626"
                        : groupKey === "High"
                          ? "#ea580c"
                          : groupKey === "Medium"
                            ? "#2563eb"
                            : "#6b7280"
                      : "#3b82f6",
                }}
              >
                {/* Group Header */}
                <div
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                  onClick={() => toggleGroup(groupKey)}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full shadow-md ${getGroupColor(groupKey)}`}
                    ></div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {groupKey}
                    </h3>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-700/70 px-2.5 py-1 rounded-full border border-gray-300 dark:border-gray-600">
                      {tasks.length}
                    </span>
                    {groupCompletedCount > 0 && (
                      <span className="text-xs font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-500/20 px-2.5 py-1 rounded-full border border-green-300 dark:border-green-500/30">
                        {groupCompletedCount} ✓
                      </span>
                    )}
                  </div>
                  <div
                    className={`transform transition-transform duration-200 ${isCollapsed ? "rotate-0" : "rotate-90"}`}
                  >
                    <span className="text-gray-600 dark:text-gray-400 text-lg">
                      ▶
                    </span>
                  </div>
                </div>

                {/* Group Tasks */}
                {!isCollapsed && (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700/50 bg-white dark:bg-gray-800/30">
                    {tasks.map((task) => {
                      const taskStatus = getTaskStatus(task.id);
                      const assignedMember = dummyMembers.find(
                        (m) => m.user_id === task.assignees?.[0]
                      );

                      return (
                        <div
                          key={task.id}
                          className={`p-6 pl-10 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all duration-200 ${
                            completedTasks.has(task.id)
                              ? "opacity-75 bg-gray-50 dark:bg-gray-700/20"
                              : ""
                          }`}
                        >
                          <div className="flex items-start space-x-4">
                            {/* Checkbox */}
                            <button
                              onClick={() => toggleTaskCompletion(task.id)}
                              className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                                completedTasks.has(task.id)
                                  ? "bg-green-500 border-green-500 text-white"
                                  : "border-gray-400 dark:border-gray-500 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-400/10"
                              }`}
                            >
                              {completedTasks.has(task.id) && (
                                <FiCheck className="h-4 w-4" />
                              )}
                            </button>

                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3
                                  className={`text-lg font-medium transition-all duration-200 ${
                                    completedTasks.has(task.id)
                                      ? "text-gray-400 line-through"
                                      : "text-gray-900 dark:text-white"
                                  }`}
                                >
                                  {task.content}
                                </h3>
                                {sortBy !== "status" && (
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(taskStatus)}`}
                                  >
                                    {taskStatus}
                                  </span>
                                )}
                              </div>

                              {task.description && (
                                <p
                                  className={`text-sm mb-3 transition-all duration-200 ${
                                    completedTasks.has(task.id)
                                      ? "text-gray-500 dark:text-gray-500"
                                      : "text-gray-600 dark:text-gray-300"
                                  }`}
                                >
                                  {task.description}
                                </p>
                              )}

                              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                                {sortBy !== "priority" && task.priority && (
                                  <div className="flex items-center space-x-1.5">
                                    <FiFlag
                                      className={`h-4 w-4 ${
                                        task.priority === "Urgent"
                                          ? "text-red-600 dark:text-red-400"
                                          : task.priority === "High"
                                            ? "text-orange-600 dark:text-orange-400"
                                            : task.priority === "Medium"
                                              ? "text-blue-600 dark:text-blue-400"
                                              : "text-gray-500 dark:text-gray-400"
                                      }`}
                                    />
                                    <span
                                      className={`font-medium ${
                                        task.priority === "Urgent"
                                          ? "text-red-700 dark:text-red-400"
                                          : task.priority === "High"
                                            ? "text-orange-700 dark:text-orange-400"
                                            : task.priority === "Medium"
                                              ? "text-blue-700 dark:text-blue-400"
                                              : "text-gray-600 dark:text-gray-400"
                                      }`}
                                    >
                                      {task.priority}
                                    </span>
                                  </div>
                                )}

                                {sortBy !== "assignee" && assignedMember && (
                                  <div className="flex items-center space-x-1.5">
                                    <FiUser className="h-4 w-4" />
                                    <span className="font-medium">
                                      {assignedMember.full_name}
                                    </span>
                                  </div>
                                )}

                                {task.endDate && (
                                  <div className="flex items-center space-x-1.5 text-blue-600 dark:text-blue-400">
                                    <FiCalendar className="h-4 w-4" />
                                    <span className="font-medium">
                                      Due: {task.endDate}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => deleteTask(task.id)}
                                className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                title="Delete task"
                              >
                                <FiTrash className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {filteredTasks.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <FiSearch className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No tasks found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
